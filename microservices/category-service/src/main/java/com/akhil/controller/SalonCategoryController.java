package com.akhil.controller;

import com.akhil.dto.SalonDTO;
import com.akhil.model.Category;
import com.akhil.service.CategoryService;
import com.akhil.service.client.SalonFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/categories/salon-owner")
@RequiredArgsConstructor
public class SalonCategoryController {
    private final CategoryService categoryService;
    private final SalonFeignClient salonFeignClient;

    @PostMapping()
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();
        Category savedCategory = categoryService.saveCategory(category,salonDTO);
        return ResponseEntity.ok(savedCategory);
    }

    @GetMapping("/salon/{salonId}/category/{id}")
    public ResponseEntity<Category> getCategoriesByIdAndSalonId(
            @PathVariable Long salonId,
            @PathVariable Long id
            ) throws Exception {


        Category category = categoryService.findByIdAndSalonId(salonId, id);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping  ("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();

        categoryService.deleteCategoryById(id, salonDTO.getId());
        return ResponseEntity.ok("category deleted Successfully");
    }


}
