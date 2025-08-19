package com.akhil.service.Impl;

import com.akhil.dto.CategoryDTO;
import com.akhil.dto.SalonDTO;
import com.akhil.dto.ServiceDTO;
import com.akhil.model.ServiceOffering;
import com.akhil.repository.ServiceOfferingRepository;
import com.akhil.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceOfferingServiceImpl implements ServiceOfferingService {

    private final ServiceOfferingRepository serviceOfferingRepository;

    @Override
    public ServiceOffering createService(SalonDTO salonDTO, ServiceDTO serviceDTO, CategoryDTO categoryDTO) {
        ServiceOffering serviceOffering = new ServiceOffering();
        serviceOffering.setName(serviceDTO.getName());
        serviceOffering.setImage(serviceDTO.getImage());
        serviceOffering.setPrice(serviceDTO.getPrice());
        serviceOffering.setDuration(serviceDTO.getDuration());
        serviceOffering.setDescription(serviceDTO.getDescription());
        serviceOffering.setSalonId(salonDTO.getId());
        serviceOffering.setCategoryId(categoryDTO.getId());

        return serviceOfferingRepository.save(serviceOffering);
    }

    @Override
    public ServiceOffering updateService(Long serviceId, ServiceOffering service) throws Exception {
        ServiceOffering serviceOffering = serviceOfferingRepository.findById(serviceId).orElse(null);

        if(serviceOffering==null){
            throw new Exception("service not exist with id "+serviceId);
        }

        serviceOffering.setName(service.getName());
        serviceOffering.setImage(service.getImage());
        serviceOffering.setPrice(service.getPrice());
        serviceOffering.setDuration(service.getDuration());
        serviceOffering.setDescription(service.getDescription());

        return serviceOfferingRepository.save(serviceOffering);
    }

    @Override
    public Set<ServiceOffering> getAllServiceBySalonId(Long salonId, Long categoryId) {
        Set<ServiceOffering> services = serviceOfferingRepository.findBySalonId(salonId);
        if(categoryId!=null){
            services = services.stream().filter((service) -> service.getCategoryId() != null && service.getCategoryId().equals(categoryId)).collect(Collectors.toSet());

        }
        return services;
    }

    @Override
    public Set<ServiceOffering> getServiceByIds(Set<Long> ids) {

        List<ServiceOffering> services =  serviceOfferingRepository.findAllById(ids);
        return new HashSet<>(services);
    }

    @Override
    public ServiceOffering getServiceById(Long id) throws Exception {
        ServiceOffering serviceOffering = serviceOfferingRepository.findById(id).orElse(null);

        if(serviceOffering==null){
            throw new Exception(" service not exist with id: "+id);
        }

        return serviceOffering;
    }
}
