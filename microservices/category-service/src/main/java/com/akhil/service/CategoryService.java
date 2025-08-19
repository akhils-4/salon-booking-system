package com.akhil.service;

import com.akhil.dto.SalonDTO;
import com.akhil.model.Category;

import java.util.List;
import java.util.Set;

public interface CategoryService {

    Category saveCategory(Category category, SalonDTO salonDTO);

    Set<Category> getAllCategoryBySalon(Long id);

    Category getCategoryById(Long id) throws Exception;

    void deleteCategoryById(Long id, Long salonId) throws Exception;

}
