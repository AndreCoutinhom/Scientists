package edu.senacsp.scientists.service;

import edu.senacsp.scientists.dto.*;
import edu.senacsp.scientists.entity.User;
import edu.senacsp.scientists.repository.UserRepository;
import edu.senacsp.scientists.security.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public UserService(UserRepository repository, PasswordEncoder encoder, JwtService jwtService) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public UserResponse signup(SignupRequest req) {
        if (isBlank(req.email()) || isBlank(req.name()) || isBlank(req.password())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email, name and password are required");
        }
        if (repository.existsByEmail(req.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        User user = repository.save(new User(req.email(), req.name(), encoder.encode(req.password())));
        return UserResponse.from(user);
    }

    public AuthResponse login(LoginRequest req) {
        if (isBlank(req.email()) || isBlank(req.password())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email and password are required");
        }

        User user = repository.findByEmail(req.email())
                .filter(u -> encoder.matches(req.password(), u.getPassword()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        return new AuthResponse(jwtService.generateToken(user), UserResponse.from(user));
    }

    @Transactional
    public UserResponse update(Long userId, UpdateUserRequest req) {
        if (isBlank(req.name()) || isBlank(req.email())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name and email are required");
        }

        User user = findUser(userId);

        if (repository.existsByEmailAndIdNot(req.email(), userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        if (!isBlank(req.newPassword())) {
            if (isBlank(req.currentPassword()) || !encoder.matches(req.currentPassword(), user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Current password is incorrect");
            }
            user.setPassword(encoder.encode(req.newPassword()));
        }

        user.setName(req.name());
        user.setEmail(req.email());
        return UserResponse.from(repository.save(user));
    }

    @Transactional
    public void delete(Long userId, String token) {
        repository.delete(findUser(userId)); // os cientistas do usuário são excluídos em cascata
        jwtService.revoke(token);
    }

    public void logout(String token) {
        jwtService.revoke(token);
    }

    private User findUser(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}