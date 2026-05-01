package com.my.tiffin.service;

import com.my.tiffin.dto.auth.AuthResponseDTO;
import com.my.tiffin.dto.auth.LoginRequestDTO;

public interface AuthService {

    AuthResponseDTO login(LoginRequestDTO dto);
}