package com.srinidhimart.controller;

import com.srinidhimart.dto.ApiResponse;
import com.srinidhimart.dto.AuthResponse;
import com.srinidhimart.dto.LoginRequest;
import com.srinidhimart.dto.RegisterRequest;
import com.srinidhimart.model.User;
import com.srinidhimart.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Registration successful! Welcome to Srinidhi Mart.", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful! Welcome back.", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser(@RequestParam Long userId) {
        User user = authService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.ok(user));
    }
}
