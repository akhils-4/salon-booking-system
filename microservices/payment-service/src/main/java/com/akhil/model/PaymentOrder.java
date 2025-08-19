package com.akhil.model;

import com.akhil.domain.PaymentMethod;
import com.akhil.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CollectionId;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Long amount;

    @Column(nullable = false)
    private PaymentOrderStatus status = PaymentOrderStatus.PENDING;

    @Column(nullable = false)
    private PaymentMethod paymentMethod;


    @Column(unique = true)
    private String paymentLinkId;

    @Column(nullable = false)
    private  Long userId;

    @Column(nullable = false)
    private  Long bookingId;

    @Column(nullable = false)
    private Long salonId;



}
