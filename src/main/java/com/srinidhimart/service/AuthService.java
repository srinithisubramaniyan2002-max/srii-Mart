package com.srinidhimart.service;

import com.srinidhimart.dto.AuthResponse;
import com.srinidhimart.dto.LoginRequest;
import com.srinidhimart.dto.RegisterRequest;
import com.srinidhimart.exception.BadRequestException;
import com.srinidhimart.exception.ResourceNotFoundException;
import com.srinidhimart.model.Role;
import com.srinidhimart.model.User;
import com.srinidhimart.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(cleanEmail)) {
            throw new BadRequestException("An account with this email address already exists.");
        }

        // Securely hash password using BCrypt - never plain text!
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName().trim(),
                cleanEmail,
                encodedPassword,
                request.getPhone(),
                request.getAddress(),
                Role.ROLE_USER
        );

        User savedUser = userRepository.save(user);
        String token = generateToken(savedUser);

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getPhone(),
                savedUser.getAddress()
        );
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new BadRequestException("Invalid email or password."));

        // Verify password against BCrypt hash
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password.");
        }

        String token = generateToken(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getAddress()
        );
    }

    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private String generateToken(User user) {
        return "snm_" + UUID.randomUUID().toString().replace("-", "") + "_" + user.getId();
    }
}
