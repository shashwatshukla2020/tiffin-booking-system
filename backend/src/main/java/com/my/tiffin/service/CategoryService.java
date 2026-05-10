package com.my.tiffin.service;

import com.my.tiffin.model.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);

    List<Category> getAllCategories();

    Category updateCategory(String id, Category category);

    void deleteCategory(String id);
}