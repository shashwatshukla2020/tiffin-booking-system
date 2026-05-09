package com.my.tiffin.service.impl;

import com.my.tiffin.model.Cart;
import com.my.tiffin.repository.CartRepository;
import com.my.tiffin.service.CartService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository repo;

    public CartServiceImpl(CartRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Cart> getCart(String userEmail) {
        return repo.findByUserEmail(userEmail);
    }

    @Override
    public Cart addToCart(String userEmail, Cart cart) {

        return repo.findByUserEmailAndMenuId(userEmail, cart.getMenuId())
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + 1);
                    return repo.save(existing);
                })
                .orElseGet(() -> {
                    cart.setUserEmail(userEmail);
                    cart.setQuantity(1);
                    return repo.save(cart);
                });
    }

    @Override
    public Cart updateCart(String id, Cart cart) {
        Cart existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        existing.setQuantity(cart.getQuantity());
        return repo.save(existing);
    }

    @Override
    public void deleteCart(String id) {
        repo.deleteById(id);
    }
}