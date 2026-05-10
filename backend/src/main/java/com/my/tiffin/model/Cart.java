package com.my.tiffin.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    private String id;

    private String userEmail;

    private String menuId;
    private String menuName;
    private double price;

    private int quantity;

    private String category;

    private String imageUrl;
}