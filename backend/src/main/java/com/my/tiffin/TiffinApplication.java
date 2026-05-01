package com.my.tiffin; /// It is the base package.---> All other files must be present inside this

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//it have --> Component Scan +  Auto Configuration  + Spring Boot Startup
@SpringBootApplication
public class TiffinApplication {

    public static void main(String[] args) {

        SpringApplication.run(TiffinApplication.class, args);  //To start Backend Server
    }

}
