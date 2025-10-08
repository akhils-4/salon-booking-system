package com.akhil.mapper;

import com.akhil.modal.Salon;
import com.akhil.payload.dto.SalonDTO;
import com.akhil.payload.dto.UserDTO;


public class SalonMapper {

    public static SalonDTO mapToDTO(Salon salon, UserDTO userDTO) {
        if (salon == null) {
            return null;
        }

        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(salon.getId());
        salonDTO.setName(salon.getName());
        salonDTO.setAddress(salon.getAddress());
        salonDTO.setPhoneNumber(salon.getPhoneNumber());
        salonDTO.setEmail(salon.getEmail());
        salonDTO.setCity(salon.getCity());
//        salonDTO.setIsOpen(salon.isOpen());
        salonDTO.setHomeService(salon.isHomeService());
        salonDTO.setActive(salon.isActive());
        salonDTO.setOwnerId(salon.getOwnerId());
        salonDTO.setOpenTime(salon.getOpenTime());
        salonDTO.setCloseTime(salon.getCloseTime());
        salonDTO.setImages(salon.getImages());
        salonDTO.setOwner(userDTO);

        return salonDTO;
    }

}
