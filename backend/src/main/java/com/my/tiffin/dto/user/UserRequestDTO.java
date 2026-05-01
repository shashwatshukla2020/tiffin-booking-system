package com.my.tiffin.dto.user;

import lombok.Data;

@Data
public class UserRequestDTO {

    private String name;
    private String email;
    private String password;

}