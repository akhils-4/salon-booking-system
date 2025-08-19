package com.akhil.controller;

import com.akhil.dto.CategoryDTO;
import com.akhil.dto.SalonDTO;
import com.akhil.dto.ServiceDTO;
import com.akhil.model.ServiceOffering;
import com.akhil.repository.ServiceOfferingRepository;
import com.akhil.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-offering/salon-owner")
@RequiredArgsConstructor
public class SalonServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    @PostMapping
    public ResponseEntity<ServiceOffering> createService(@RequestBody ServiceDTO serviceDTO){
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(1L);


        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(serviceDTO.getCategory());

        ServiceOffering service = serviceOfferingService.createService(salonDTO,serviceDTO,categoryDTO);

        return ResponseEntity.ok(service);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateService(@PathVariable Long id,@RequestBody ServiceOffering serviceOffering) throws Exception {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(1L);

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(1L);

        ServiceOffering service = serviceOfferingService.updateService(id,serviceOffering);

        return ResponseEntity.ok(service);
    }


}
