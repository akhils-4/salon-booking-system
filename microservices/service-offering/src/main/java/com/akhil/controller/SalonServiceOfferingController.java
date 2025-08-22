package com.akhil.controller;

import com.akhil.dto.CategoryDTO;
import com.akhil.dto.SalonDTO;
import com.akhil.dto.ServiceDTO;
import com.akhil.model.ServiceOffering;
import com.akhil.repository.ServiceOfferingRepository;
import com.akhil.service.ServiceOfferingService;
import com.akhil.service.client.CategoryFeignClient;
import com.akhil.service.client.SalonFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-offering/salon-owner")
@RequiredArgsConstructor
public class SalonServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;
    private final SalonFeignClient salonFeignClient;
    private final CategoryFeignClient categoryFeignClient;

    @PostMapping
    public ResponseEntity<ServiceOffering> createService(@RequestBody ServiceDTO serviceDTO,@RequestHeader("Authorization") String jwt ) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();

        // Add null checks
        if (salonDTO == null || salonDTO.getId() == null) {
            throw new IllegalArgumentException("Salon details not found");
        }

        if (serviceDTO.getCategory() == null) {
            throw new IllegalArgumentException("Category ID is required");
        }
        CategoryDTO categoryDTO = categoryFeignClient
                .getCategoriesByIdAndSalonId( serviceDTO.getCategory(), salonDTO.getId()).getBody();


        if (categoryDTO == null) {
            throw new IllegalArgumentException("Category not found");
        }

        ServiceOffering service = serviceOfferingService.createService(salonDTO,serviceDTO,categoryDTO);

        return ResponseEntity.ok(service);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateService(@PathVariable Long id,@RequestBody ServiceOffering serviceOffering) throws Exception {
        ServiceOffering service = serviceOfferingService.updateService(id,serviceOffering);

        return ResponseEntity.ok(service);
    }


}
