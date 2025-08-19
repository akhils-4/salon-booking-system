package com.akhil.service;

import com.akhil.domain.BookingStatus;
import com.akhil.dto.BookingRequest;
import com.akhil.dto.SalonDTO;
import com.akhil.dto.ServiceDTO;
import com.akhil.dto.UserDTO;
import com.akhil.model.Booking;
import com.akhil.model.SalonReport;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {

    Booking createBooking(BookingRequest booking, UserDTO user, SalonDTO salon, Set<ServiceDTO> serviceDTOSet) throws Exception;

    List<Booking> getBookingByCustomer(Long customerId);

    List<Booking> getBookingBySalon(Long salonId);

    Booking getBookingById(Long id) throws Exception;

    Booking updateBooking(Long bookingId, BookingStatus bookingStatus) throws Exception;

    List<Booking> getBookingsByDate(LocalDate date, Long salonId);

    SalonReport getSalonReport(Long salonId );
}
