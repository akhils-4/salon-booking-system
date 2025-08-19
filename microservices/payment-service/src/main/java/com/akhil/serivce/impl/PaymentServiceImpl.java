package com.akhil.serivce.impl;

import com.akhil.domain.PaymentMethod;
import com.akhil.domain.PaymentOrderStatus;
import com.akhil.model.PaymentOrder;
import com.akhil.payload.dto.BookingDTO;
import com.akhil.payload.dto.UserDTO;
import com.akhil.payload.PaymentLinkResponse;
import com.akhil.repository.PaymentRepository;
import com.akhil.serivce.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;


    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String razorpayApiSecret;

    @Override
    public PaymentLinkResponse createOrder(UserDTO user, BookingDTO booking, PaymentMethod paymentMethod) throws RazorpayException, StripeException {
        Long amount = (long) booking.getTotalPrice();

        PaymentOrder order = new PaymentOrder();
        order.setAmount(amount);
        order.setPaymentMethod(paymentMethod);
        order.setBookingId(booking.getId());
        order.setSalonId(booking.getSalonId());
        order.setUserId(user.getId());  // ✅ Added to fix missing userId issue

        PaymentOrder savedOrder = paymentRepository.save(order);

        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();

        if (PaymentMethod.RAZORPAY.equals(paymentMethod)) {
            PaymentLink payment = createRazorPayPaymentLink(user, savedOrder.getAmount(), savedOrder.getId());

            String paymentUrl = payment.get("short_url");
            String paymentUrlId = payment.get("id");

            paymentLinkResponse.setPayment_link_url(paymentUrl);
            paymentLinkResponse.setPayment_link_id(paymentUrlId);

            savedOrder.setPaymentLinkId(paymentUrlId);
            paymentRepository.save(savedOrder);
        } else {
            String paymentUrl = createStripePaymentLink(user, savedOrder.getAmount(), savedOrder.getId());
            paymentLinkResponse.setPayment_link_url(paymentUrl);

            // ✅ Set a dummy unique paymentLinkId for Stripe to avoid DB constraint issues
            savedOrder.setPaymentLinkId("stripe_" + savedOrder.getId());
            paymentRepository.save(savedOrder);
        }

        return paymentLinkResponse;
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentRepository.findById(id).orElseThrow(() -> new Exception("Payment order not found."));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) {
        return paymentRepository.findByPaymentLinkId(paymentId);
    }

    @Override
    public PaymentLink createRazorPayPaymentLink(UserDTO user, Long amount, Long orderId) throws RazorpayException {
        Long razorpayAmount = amount * 100;

        RazorpayClient razorpay = new RazorpayClient(razorpayApiKey, razorpayApiSecret);

        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", razorpayAmount);
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", user.getFullName());
        customer.put("email", user.getEmail());
        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("email", true);
        paymentLinkRequest.put("notify", notify);

        paymentLinkRequest.put("remainder_enable", true);
        paymentLinkRequest.put("callback_url", "http://localhost:3000/payment-success/" + orderId);
        paymentLinkRequest.put("callback_method", "get");

        return razorpay.paymentLink.create(paymentLinkRequest);
    }

    @Override
    public String createStripePaymentLink(UserDTO user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment-success/" + orderId)
                .setCancelUrl("http://localhost:3000/payment-cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Salon appointment booking")
                                        .build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(params);
        return session.getUrl();
    }

    @Override
    public Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
        if (PaymentOrderStatus.PENDING != paymentOrder.getStatus()) return false;

        if (PaymentMethod.RAZORPAY.equals(paymentOrder.getPaymentMethod())) {
            RazorpayClient razorpay = new RazorpayClient(razorpayApiKey, razorpayApiSecret);

            Payment payment = razorpay.payments.fetch(paymentId);
            String status = payment.get("status");

            if ("captured".equals(status)) {
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentRepository.save(paymentOrder);
                return true;
            }
            return false;
        } else {
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
            paymentRepository.save(paymentOrder);
            return true;
        }
    }
}
