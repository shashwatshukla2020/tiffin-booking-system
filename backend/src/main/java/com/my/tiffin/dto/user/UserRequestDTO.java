package com.my.tiffin.dto.user;

import lombok.Data;

import java.util.Set;

@Data
public class UserRequestDTO {

    private String name;
    private String email;
    private String password;
    private Set<String> roles;
}