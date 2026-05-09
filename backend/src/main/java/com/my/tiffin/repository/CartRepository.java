package com.my.tiffin.repository;

import com.my.tiffin.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {

    List<Cart> findByUserEmail(String userEmail);

    Optional<Cart> findByUserEmailAndMenuId(String userEmail, String menuId);
}