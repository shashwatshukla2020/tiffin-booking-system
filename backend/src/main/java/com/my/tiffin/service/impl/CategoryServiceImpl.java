package com.my.tiffin.service.impl;

import com.my.tiffin.model.Category;
import com.my.tiffin.repository.CategoryRepository;
import com.my.tiffin.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl
        implements CategoryService {

    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Category addCategory(Category category) {
        return repository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    @Override
    public Category updateCategory(
            String id,
            Category category
    ) {

        Category existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));

        existing.setName(category.getName());

        existing.setActive(category.isActive());

        return repository.save(existing);
    }

    @Override
    public void deleteCategory(String id) {
        repository.deleteById(id);
    }
}