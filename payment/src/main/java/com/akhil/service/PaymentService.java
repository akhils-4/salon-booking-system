package com.akhil.service;



import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.akhil.domain.PaymentMethod;
import com.akhil.exception.UserException;
import com.akhil.modal.PaymentOrder;
import com.akhil.payload.dto.BookingDTO;
import com.akhil.payload.dto.UserDTO;
import com.akhil.payload.response.PaymentLinkResponse;


public interface PaymentService {

    PaymentLinkResponse createOrder(UserDTO user,
                                    BookingDTO booking, PaymentMethod paymentMethod) throws RazorpayException, UserException, StripeException;

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;

    Boolean ProceedPaymentOrder (PaymentOrder paymentOrder,
                                 String paymentId, String paymentLinkId) throws RazorpayException;

    PaymentLink createRazorpayPaymentLink(UserDTO user,
                                          Long Amount,
                                          Long orderId) throws RazorpayException;

    String createStripePaymentLink(UserDTO user, Long Amount,
                                            Long orderId) throws StripeException;
}
