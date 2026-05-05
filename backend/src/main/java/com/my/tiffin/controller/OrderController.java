package com.my.tiffin.controller;

import com.my.tiffin.model.Order;
import com.my.tiffin.service.OrderService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // ✅ Place order
    @PostMapping
    public Order placeOrder(@RequestBody Order order, Authentication auth) {
        return service.placeOrder(order, auth.getName());
    }

    // ✅ Get my orders
    @GetMapping("/my")
    public List<Order> getMyOrders(Authentication auth) {
        return service.getMyOrders(auth.getName());
    }


    // Vendor → get all orders
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    // Vendor → update status
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable String id,
                              @RequestParam String status) {
        return service.updateStatus(id, status);
    }

}