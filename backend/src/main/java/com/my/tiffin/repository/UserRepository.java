package com.my.tiffin.repository;

import com.my.tiffin.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface  UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);
    List<User> findByRolesContaining(String role);

}
