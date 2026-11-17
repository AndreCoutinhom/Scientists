package edu.senacsp.scientists.dto;

public record UpdateUserRequest(
        String name,
        String email,
        String currentPassword,
        String newPassword
) {}
