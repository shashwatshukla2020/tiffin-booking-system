package com.my.tiffin.controller;

import com.my.tiffin.model.Category;
import com.my.tiffin.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    // ================= ADD =================

    @PostMapping
    public Category addCategory(
            @RequestBody Category category
    ) {
        return service.addCategory(category);
    }

    // ================= GET ALL =================

    @GetMapping
    public List<Category> getAllCategories() {
        return service.getAllCategories();
    }

    // ================= UPDATE =================

    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable String id,
            @RequestBody Category category
    ) {
        return service.updateCategory(id, category);
    }

    // ================= DELETE =================

    @DeleteMapping("/{id}")
    public void deleteCategory(
            @PathVariable String id
    ) {
        service.deleteCategory(id);
    }
}