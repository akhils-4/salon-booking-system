package com.akhil.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

@Data
public class ServiceDTO {


    private  String id;

    private  String name;

    private  String description;

    private Integer price;

    private  int duration;

    private  Long salonId;

    private Long category;

    private  String image;

}
