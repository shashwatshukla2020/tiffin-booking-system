package com.my.tiffin.controller;

import com.my.tiffin.model.Cart;
import com.my.tiffin.service.CartService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    // ================= GET CART =================
    @GetMapping
    public List<Cart> getCart(Authentication auth) {
        return service.getCart(auth.getName());
    }

    // ================= ADD TO CART =================
    @PostMapping
    public Cart addToCart(@RequestBody Cart cart,
                          Authentication auth) {
        return service.addToCart(auth.getName(), cart);
    }

    // ================= UPDATE CART =================
    @PutMapping("/{id}")
    public Cart updateCart(@PathVariable String id,
                           @RequestBody Cart cart) {
        return service.updateCart(id, cart);
    }

    // ================= DELETE ITEM =================
    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable String id) {
        service.deleteCart(id);
    }
}