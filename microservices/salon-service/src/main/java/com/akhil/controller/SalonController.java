package com.akhil.controller;

import com.akhil.mapper.SalonMapper;
import com.akhil.model.Salon;
import com.akhil.payload.dto.SalonDTO;
import com.akhil.payload.dto.UserDTO;
import com.akhil.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {

    private final SalonService salonService;

    @PostMapping
    public ResponseEntity<SalonDTO> createSalon(@RequestBody SalonDTO salonDTO){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        Salon salon = salonService.createSalon(salonDTO, userDTO);
        SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
        return  ResponseEntity.ok(salonDTO1);
    }


    @PutMapping("/{salonId}")
    public ResponseEntity<SalonDTO> updateSalon(@PathVariable Long salonId, @RequestBody SalonDTO salonDTO
                                                ) throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        // Set ownerId in DTO if it's null
        if (salonDTO.getOwnerId() == null) {
            salonDTO.setOwnerId(userDTO.getId());
        }

        Salon salon = salonService.updateSalon(salonDTO, userDTO,salonId);
        SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
        return  ResponseEntity.ok(salonDTO1);
    }

    @GetMapping()
    public ResponseEntity<List<SalonDTO>> getSalon(@RequestBody SalonDTO salonDTO) throws Exception {

        List<Salon> salons = salonService.getAllSalons();
        List<SalonDTO> salonDTOS = salons.stream().map((salon )->
                {
                  SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
                  return   salonDTO1;
                }
                ).toList();
        return  ResponseEntity.ok(salonDTOS);
    }

    @GetMapping("/{salonId}")
    public ResponseEntity<SalonDTO> getSalonById(@PathVariable Long salonId) throws Exception {
        Salon salon = salonService.getSalonById(salonId);
        SalonDTO salonDTOS = SalonMapper.mapToDTO(salon);
        return  ResponseEntity.ok(salonDTOS);
    }

    @GetMapping("/salons ")
    public ResponseEntity<List<SalonDTO>> searchSalons(@RequestParam("city") String city)  throws Exception {

        List<Salon> salons = salonService.searchSalonByCityName(city);
        List<SalonDTO> salonDTOS = salons.stream().map((salon )->
                {
                    SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
                    return   salonDTO1;
                }
        ).toList();
        return  ResponseEntity.ok(salonDTOS);
    }

    @GetMapping("/owner")
    public ResponseEntity<SalonDTO> getSalonByOwnerId() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        Salon salon = salonService.getSalonByOwnerId(userDTO.getId());
        SalonDTO salonDTOS = SalonMapper.mapToDTO(salon);
        return  ResponseEntity.ok(salonDTOS);
    }





    
}
