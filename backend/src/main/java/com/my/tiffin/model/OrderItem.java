package com.my.tiffin.model;

import lombok.Data;

@Data
public class OrderItem {

    private String menuId;

    private String menuName;

    private String category;

    private String imageUrl;

    private int quantity;

    private double price;

    private double total;

    // Optional
    private String vendorId;
}