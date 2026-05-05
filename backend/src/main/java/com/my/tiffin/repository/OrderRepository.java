package com.my.tiffin.repository;

import com.my.tiffin.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByCustomerEmail(String email);
}