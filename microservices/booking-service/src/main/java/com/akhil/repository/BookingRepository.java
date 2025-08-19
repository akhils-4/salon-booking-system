package com.akhil.repository;

import com.akhil.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.ListResourceBundle;

public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByCustomerId(Long customerId);

    List<Booking> findBySalonId(Long salonId);
}
