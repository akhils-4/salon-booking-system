package com.akhil.model;

import lombok.Data;

@Data
public class SalonReport {
    private Long salonId;
    private String salonName;
    private Integer totalEarning;
    private Integer totalBookings;
    private Integer totalCancelledBookings;
    private  Double totalRefund;


}
