package com.my.tiffin.service;

import com.my.tiffin.dto.user.UserRequestDTO;
import com.my.tiffin.dto.user.UserResponseDTO;
import com.my.tiffin.repository.UserRepository;

import java.util.List;

public interface UserService {

    UserResponseDTO registerUser(UserRequestDTO dto);
    //Used to create a new user by taking input data (DTO), processing it, and returning a safe response DTO

    List<UserResponseDTO> getAllUsers();
    //Used to fetch all users from the database and return them as a list of response DTOs

    UserResponseDTO getUserById(String id);
    //Used to retrieve a specific user by ID and return it as a response DTO
}
