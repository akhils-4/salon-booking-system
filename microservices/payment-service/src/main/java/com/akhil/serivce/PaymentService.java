package com.akhil.serivce;

import com.akhil.domain.PaymentMethod;
import com.akhil.model.PaymentOrder;
import com.akhil.payload.dto.BookingDTO;
import com.akhil.payload.dto.UserDTO;
import com.akhil.payload.PaymentLinkResponse;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {


    PaymentLinkResponse createOrder(UserDTO user,
                                    BookingDTO booking,
                                    PaymentMethod paymentMethod) throws RazorpayException, StripeException;

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    PaymentOrder getPaymentOrderByPaymentId(String paymentId);

    PaymentLink createRazorPayPaymentLink(UserDTO user, Long amount, Long OrderId) throws RazorpayException;

    String createStripePaymentLink(UserDTO user, Long amount, Long OrderId) throws StripeException;

    Boolean proceedPayment (PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException;
}
