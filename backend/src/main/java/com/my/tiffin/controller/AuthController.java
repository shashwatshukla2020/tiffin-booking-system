package com.my.tiffin.controller;

import com.my.tiffin.dto.auth.AuthResponseDTO;
import com.my.tiffin.dto.auth.LoginRequestDTO;
import com.my.tiffin.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // 🔐 LOGIN API
    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginRequestDTO dto) {
        return authService.login(dto);
    }
}