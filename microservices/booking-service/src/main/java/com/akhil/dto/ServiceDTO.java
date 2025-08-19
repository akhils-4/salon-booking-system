package com.akhil.dto;

import lombok.Data;

@Data
public class ServiceDTO {


    private  Long id;

    private  String name;

    private  String description;

    private Integer price;

    private  int duration;

    private  Long salonId;

    private Long category;

    private  String image;

}
