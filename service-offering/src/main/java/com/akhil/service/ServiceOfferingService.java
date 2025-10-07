package com.akhil.service;

import com.akhil.modal.ServiceOffering;
import com.akhil.payload.dto.CategoryDTO;
import com.akhil.payload.dto.SalonDTO;
import com.akhil.payload.dto.ServiceDTO;

import java.util.Set;

public interface ServiceOfferingService {


    ServiceOffering createService(
            ServiceDTO service,
            SalonDTO salon,
            CategoryDTO category
    );

    com.akhil.modal.ServiceOffering updateService(
            Long serviceId,
            ServiceOffering service
    ) throws Exception;

    Set<ServiceOffering> getAllServicesBySalonId(Long salonId,Long categoryId);

    com.akhil.modal.ServiceOffering getServiceById(Long serviceId);

    Set<ServiceOffering> getServicesByIds(Set<Long> ids);
}
