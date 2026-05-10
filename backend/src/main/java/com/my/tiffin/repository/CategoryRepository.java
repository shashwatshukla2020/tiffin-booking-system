package com.my.tiffin.repository;

import com.my.tiffin.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository
        extends MongoRepository<Category, String> {
}