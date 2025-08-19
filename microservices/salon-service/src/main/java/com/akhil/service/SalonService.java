package com.akhil.service;

import com.akhil.model.Salon;
import com.akhil.payload.dto.SalonDTO;
import com.akhil.payload.dto.UserDTO;

import java.util.List;

public interface SalonService {
    Salon createSalon(SalonDTO salon, UserDTO user);

    Salon updateSalon(SalonDTO salonDTO, UserDTO userDTO,Long salonId) throws Exception;

     List<Salon> getAllSalons();

     Salon getSalonById(Long salonId) throws Exception;

     Salon getSalonByOwnerId(Long ownerId);

     List<Salon> searchSalonByCityName(String city);




}
