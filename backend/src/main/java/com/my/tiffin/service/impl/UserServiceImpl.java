package com.my.tiffin.service.impl;

import com.my.tiffin.dto.user.*;
import com.my.tiffin.model.Role;
import com.my.tiffin.model.User;
import com.my.tiffin.repository.UserRepository;
import com.my.tiffin.service.UserService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class UserServiceImpl implements UserService {


    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

//    public UserServiceImpl(UserRepository repository) {
//        this.repository = repository;
//    }

    public UserServiceImpl(UserRepository repository,
                           PasswordEncoder passwordEncoder) {

        this.repository = repository;
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
    }



    // 🔹 Register User
    @Override
    public UserResponseDTO registerUser(UserRequestDTO dto) {

        // Convert DTO → Model
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        //user.setPassword(dto.getPassword());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // Business Logic: Assign default role
        // ✅ FIX: Use roles from DTO if provided
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            user.setRoles(
                    dto.getRoles().stream()
                            .map(Role::valueOf)
                            .collect(Collectors.toSet())
            );
        } else {
            // Default role
            user.setRoles(Set.of(Role.CUSTOMER));
        }

        // Save to DB
        User saved = repository.save(user);

        // Convert Model → DTO
        return mapToResponse(saved);
    }

    // 🔹 Get All Users
    @Override
    public List<UserResponseDTO> getAllUsers() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 🔹 Get User by ID
    @Override
    public UserResponseDTO getUserById(String id) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToResponse(user);
    }

    // 🔹 Mapping Method (Model → DTO)
    private UserResponseDTO mapToResponse(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRoles()
                        .stream()
                        .map(Enum::name)
                        .collect(Collectors.toSet())
        );
    }

    // 🔹 Update User
    @Override
    public UserResponseDTO updateUser(String id, UserRequestDTO dto) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update Name
        user.setName(dto.getName());

        // Update Email
        user.setEmail(dto.getEmail());

        // Update Password only if entered
        if (dto.getPassword() != null &&
                !dto.getPassword().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(dto.getPassword())
            );
        }

        // Update Roles
        if (dto.getRoles() != null &&
                !dto.getRoles().isEmpty()) {

            user.setRoles(
                    dto.getRoles().stream()
                            .map(Role::valueOf)
                            .collect(Collectors.toSet())
            );
        }

        User updated = repository.save(user);

        return mapToResponse(updated);
    }

    // 🔹 Delete User
    @Override
    public void deleteUser(String id) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        repository.delete(user);
    }

    @Override
    public List<User> getDeliveryUsers() {


        return repository.findByRolesContaining("DELIVERY");
    }
}
