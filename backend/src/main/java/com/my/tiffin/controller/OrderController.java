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

    // ================= PLACE ORDER =================
    @PostMapping
    public Order placeOrder(
            @RequestBody Order order,
            Authentication auth
    ) {

        return service.placeOrder(
                order,
                auth.getName()
        );
    }

    // ================= MY ORDERS =================
    @GetMapping("/my")
    public List<Order> getMyOrders(
            Authentication auth
    ) {

        return service.getMyOrders(
                auth.getName()
        );
    }

    // ================= ALL ORDERS =================
    @GetMapping("/all")
    public List<Order> getAllOrders() {

        return service.getAllOrders();
    }

    // ================= UPDATE STATUS =================
    @PutMapping("/{id}/status")
    public Order updateStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {

        return service.updateStatus(id, status);
    }

    // ================= CHECKOUT =================
    @PostMapping("/checkout")
    public Order checkout(
            Authentication auth
    ) {

        return service.checkout(
                auth.getName()
        );
    }

    @GetMapping("/delivery")
    public List<Order> getDeliveryOrders(Authentication auth) {

        return service.getDeliveryOrders(auth.getName());
    }

//    @PutMapping("/{id}/assign")
//    public Order assignDelivery(
//            @PathVariable String id,
//            @RequestParam String deliveryEmail
//    ) {
//
//        return service.assignDelivery(id, deliveryEmail);
//    }

    @PutMapping("/{id}/delivery-status")
    public Order updateDeliveryStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {

        return service.updateDeliveryStatus(id, status);
    }

    @PutMapping("/{id}/assign-delivery")
    public Order assignDelivery(
            @PathVariable String id,
            @RequestParam String deliveryEmail,
            @RequestParam String deliveryName
    ) {

        return service.assignDelivery(
                id,
                deliveryEmail,
                deliveryName
        );
    }


}