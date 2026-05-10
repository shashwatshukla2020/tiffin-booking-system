package com.my.tiffin.controller;

import com.my.tiffin.dto.user.UserRequestDTO;
import com.my.tiffin.dto.user.UserResponseDTO;
import com.my.tiffin.model.User;
import com.my.tiffin.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    // ================= DEPENDENCY INJECTION =================

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // ================= REGISTER USER =================

    @PostMapping("/register")
    public UserResponseDTO registerUser(
            @Valid @RequestBody UserRequestDTO dto
    ) {

        return service.registerUser(dto);
    }

    // ================= GET ALL USERS =================

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {

        return service.getAllUsers();
    }

    // ================= GET USER BY ID =================

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(
            @PathVariable String id
    ) {

        return service.getUserById(id);
    }

    // ================= UPDATE USER =================

    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable String id,
            @RequestBody UserRequestDTO dto
    ) {

        return service.updateUser(id, dto);
    }

    // ================= DELETE USER =================

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable String id
    ) {

        service.deleteUser(id);

        return "User deleted successfully";
    }

    // ================= GET DELIVERY USERS =================

    @GetMapping("/delivery")
    public List<User> getDeliveryUsers() {

        return service.getDeliveryUsers();
    }
}