package com.my.tiffin.controller;

import com.my.tiffin.dto.user.UserRequestDTO;
import com.my.tiffin.dto.user.UserResponseDTO;
import com.my.tiffin.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController  // Tells--> This class handles API requests and returns JSON
@RequestMapping("/api/users")
public class UserController {

    //Dependency Injection (DI)
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // ✅ Register User
    @PostMapping("/register")
    public UserResponseDTO registerUser(@Valid @RequestBody UserRequestDTO dto) {
        return service.registerUser(dto);
    }

    // ✅ Get All Users
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return service.getAllUsers();
    }

    // ✅ Get User by ID
    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable String id) {
        return service.getUserById(id);
    }


    // ✅ Update User
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable String id,
            @RequestBody UserRequestDTO dto
    ) {
        return service.updateUser(id, dto);
    }

    // ✅ Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {

        service.deleteUser(id);

        return "User deleted successfully";
    }

}