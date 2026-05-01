package com.my.tiffin.service.impl;

import com.my.tiffin.dto.auth.AuthResponseDTO;
import com.my.tiffin.dto.auth.LoginRequestDTO;
import com.my.tiffin.model.User;
import com.my.tiffin.repository.UserRepository;
import com.my.tiffin.security.JwtUtil;
import com.my.tiffin.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

//    public AuthServiceImpl(UserRepository userRepository,
//                           PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO dto) {

        // 1. Try to find user
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // 2. Check password
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 3. Success → generate token (temporary for now)
        //String token = "DUMMY-TOKEN-12345";
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRoles().stream()
                        .map(Enum::name)
                        .toList()
        );

        return new AuthResponseDTO(token, "Login successful");
    }
}