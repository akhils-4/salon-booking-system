package com.akhil.controller;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.akhil.domain.PaymentMethod;
import com.akhil.exception.UserException;
import com.akhil.modal.PaymentOrder;
import com.akhil.payload.dto.BookingDTO;
import com.akhil.payload.dto.UserDTO;
import com.akhil.payload.response.PaymentLinkResponse;
import com.akhil.service.PaymentService;
import com.akhil.service.clients.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final UserFeignClient userService;


    @PostMapping("/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @RequestHeader("Authorization") String jwt,
            @RequestBody BookingDTO booking,
            @RequestParam PaymentMethod paymentMethod) throws UserException,
            RazorpayException, StripeException {

        System.out.println("------"+booking);

            UserDTO user = userService.getUserFromJwtToken(jwt).getBody();

            PaymentLinkResponse paymentLinkResponse = paymentService
                    .createOrder(user, booking, paymentMethod);

            return ResponseEntity.ok(paymentLinkResponse);
    }

    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> getPaymentOrderById(
            @PathVariable Long paymentOrderId) {
        try {
            PaymentOrder paymentOrder = paymentService.getPaymentOrderById(paymentOrderId);
            return ResponseEntity.ok(paymentOrder);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/proceed")
    public ResponseEntity<Boolean> proceedPayment(
            @RequestParam String paymentId,
            @RequestParam String paymentLinkId) throws Exception {

            PaymentOrder paymentOrder = paymentService.
                    getPaymentOrderByPaymentId(paymentLinkId);
            Boolean success = paymentService.ProceedPaymentOrder(
                    paymentOrder,
                    paymentId, paymentLinkId);
            return ResponseEntity.ok(success);

    }


}
