package com.akhil.mapper;

import com.akhil.model.Salon;
import com.akhil.payload.dto.SalonDTO;
import com.akhil.payload.dto.UserDTO;

public class SalonMapper  {

    public  static SalonDTO mapToDTO(Salon salon){
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setCity(salon.getCity());
        salonDTO.setImages(salon.getImages());
        salonDTO.setEmail(salon.getEmail());
        salonDTO.setName(salon.getName());
        salonDTO.setId(salon.getId());
        salonDTO.setAddress(salon.getAddress());
        salonDTO.setPhoneNumber(salon.getPhoneNumber());
        salonDTO.setOpenTime(salon.getOpenTime());
        salonDTO.setCloseTime(salon.getCloseTime());
        salonDTO.setOwnerId(salon.getOwnerId());
        return salonDTO;
    }
}
