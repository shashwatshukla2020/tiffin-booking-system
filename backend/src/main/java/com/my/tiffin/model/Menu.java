package com.my.tiffin.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "menus")
public class Menu {

    @Id
    private String id;

    // ================= BASIC =================

    private String name;

    private String description;

    private double price;

    // ================= AVAILABILITY =================

    private boolean available = true;

    // ================= VENDOR =================

    private String vendorId;

    // ================= NEW FIELDS =================

    // Breakfast / Lunch / Dinner / Snacks
    private String category;

    // true = Veg
    // false = Non-Veg
    private boolean veg;

    // Food Image URL
    private String imageUrl;
}