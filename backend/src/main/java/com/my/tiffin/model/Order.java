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

    private String customerEmail;
    private String menuId;
    private String menuName;
    private double price;

    private String status; // PLACED, PREPARING, DELIVERED

    private LocalDateTime createdAt;
}