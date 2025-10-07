package com.akhil.modal;

import com.akhil.domain.PaymentMethod;
import com.akhil.domain.PaymentOrderStatus;
import lombok.Data;

@Data
public class PaymentOrder {
    private Long id;

    private Long amount;

    private PaymentOrderStatus status;

    private PaymentMethod paymentMethod;

    private String paymentLinkId;

    private Long userId;

    private Long bookingId;
}
