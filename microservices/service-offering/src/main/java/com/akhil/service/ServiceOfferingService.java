package com.akhil.service;

import com.akhil.dto.CategoryDTO;
import com.akhil.dto.SalonDTO;
import com.akhil.dto.ServiceDTO;
import com.akhil.model.ServiceOffering;
import jdk.jfr.Category;

import java.util.List;
import java.util.Set;

public interface ServiceOfferingService {

    ServiceOffering createService(SalonDTO salonDTo, ServiceDTO serviceDTO, CategoryDTO categoryDTO);

    ServiceOffering updateService(Long serviceId,ServiceOffering service) throws Exception;

    Set<ServiceOffering> getAllServiceBySalonId(Long salonId,Long categoryId);

    Set<ServiceOffering> getServiceByIds(Set<Long> ids);

    ServiceOffering getServiceById(Long id) throws Exception;

}
