package com.my.tiffin.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private String id;

    // ================= CUSTOMER =================

    private String customerId;

    private String customerName;

    private String customerEmail;

    // ================= ORDER ITEMS =================

    private List<OrderItem> items;

    // ================= PAYMENT =================

    private double totalAmount;

    // ================= ORDER STATUS =================

    private String status;
    // PLACED
    // PREPARING
    // OUT_FOR_DELIVERY
    // DELIVERED
    // CANCELLED

    // ================= TIMESTAMPS =================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    private String deliveryBoyEmail;
    private String deliveryBoyName;
}