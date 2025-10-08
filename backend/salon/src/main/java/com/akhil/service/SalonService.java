package com.akhil.service;

import com.akhil.modal.Salon;
import com.akhil.payload.dto.SalonDTO;
import com.akhil.payload.dto.UserDTO;

import java.util.List;

public interface SalonService {


    Salon createSalon(SalonDTO salon, UserDTO user);

    Salon updateSalon(Long salonId, Salon salon) throws Exception;

    List<Salon> getAllSalons();

    Salon getSalonById(Long salonId);

    Salon getSalonByOwnerId(Long ownerId);

    List<Salon> searchSalonByCity(String city);
}
