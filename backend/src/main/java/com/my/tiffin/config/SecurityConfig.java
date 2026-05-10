package com.my.tiffin.config;

import com.my.tiffin.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {




        http
                .cors(cors -> {})   // ✅ ADD THIS
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        // AUTH
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/users/register"
                        ).permitAll()

                        // MENU
                        .requestMatchers("/api/menu/**").authenticated()
                        // ORDERS
                        .requestMatchers("/api/orders/all").hasAnyRole("VENDOR", "ADMIN")
                        .requestMatchers("/api/orders/**").hasAnyRole("CUSTOMER", "VENDOR", "ADMIN")
                        // CART
                        .requestMatchers("/api/cart/**").hasRole("CUSTOMER")
                        // ADMIN
                        .requestMatchers("/api/users/**").hasRole("ADMIN")

                        .anyRequest().authenticated()

                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

               // .httpBasic(httpBasic -> {}); // optional

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}