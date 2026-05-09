package com.my.tiffin.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private String id;

    // ================= CUSTOMER =================
    private String customerEmail;

    // ================= PRODUCT =================
    private String menuId;
    private String menuName;

    // ⭐ IMPORTANT FOR CART SYSTEM
    private int quantity;

    private double price; // single item price

    // ================= ORDER STATUS =================
    private String status;
    // PLACED, PREPARING, OUT_FOR_DELIVERY, DELIVERED

    // ================= TIMESTAMPS =================
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ================= OPTIONAL (RECOMMENDED) =================

    private String vendorEmail;   // useful for vendor dashboard later
}