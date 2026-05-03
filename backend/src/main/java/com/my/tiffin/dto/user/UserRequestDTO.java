package com.my.tiffin.dto.user;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Set;

@Data
public class UserRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Password is required")
    //@Size(min = 4, message = "Password must be at least 4 chars")
    private String password;

    private Set<String> roles;
}