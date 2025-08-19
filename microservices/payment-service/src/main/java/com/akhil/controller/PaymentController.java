package com.akhil.controller;

import com.akhil.domain.PaymentMethod;
import com.akhil.model.PaymentOrder;
import com.akhil.payload.dto.BookingDTO;
import com.akhil.payload.dto.UserDTO;
import com.akhil.payload.PaymentLinkResponse;
import com.akhil.serivce.PaymentService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @RequestBody BookingDTO booking,
            @RequestParam PaymentMethod paymentMethod
            ) throws StripeException, RazorpayException {
        UserDTO user = new UserDTO();
        user.setFullName("Ashok");
        user.setEmail("ashol@gmail.com");
        user.setId(1L);

        PaymentLinkResponse  response = paymentService.createOrder(user,booking,paymentMethod);

        return ResponseEntity.ok(response);

    }

    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> getPaymentOrderById(
           @PathVariable Long paymentOrderId

    ) throws Exception {
        PaymentOrder res = paymentService.getPaymentOrderById(paymentOrderId);

        return ResponseEntity.ok(res);

    }


    @PatchMapping("/proceed")
    public ResponseEntity<Boolean> proceedPayment(
            @RequestParam String paymentId,
            @RequestParam String paymentLinkId

    ) throws Exception {

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        Boolean res = paymentService.proceedPayment(paymentOrder,paymentId, paymentLinkId);

        return ResponseEntity.ok(res);

    }






}
