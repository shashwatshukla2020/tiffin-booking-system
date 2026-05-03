package com.my.tiffin.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "menus")
public class Menu {

    @Id
    private String id;

    private String name;
    private String description;
    private double price;
    private boolean available;
    private String vendorId;
}