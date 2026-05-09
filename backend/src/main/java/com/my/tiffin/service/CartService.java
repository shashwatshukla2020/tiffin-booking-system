package com.my.tiffin.service;

import com.my.tiffin.model.Cart;

import java.util.List;

public interface CartService {

    List<Cart> getCart(String userEmail);

    Cart addToCart(String userEmail, Cart cart);

    Cart updateCart(String id, Cart cart);

    void deleteCart(String id);
}