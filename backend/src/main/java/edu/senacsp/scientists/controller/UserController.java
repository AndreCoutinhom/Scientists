package edu.senacsp.scientists.controller;

import edu.senacsp.scientists.dto.*;
import edu.senacsp.scientists.entity.User;
import edu.senacsp.scientists.service.UserService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public UserResponse get(@AuthenticationPrincipal User user) {
        return UserResponse.from(user);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.signup(req));
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        return service.login(req);
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String header) {
        service.logout(token(header));
    }

    @PutMapping
    public UserResponse update(@AuthenticationPrincipal User user, @RequestBody UpdateUserRequest req) {
        return service.update(user.getId(), req);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal User user,
                       @RequestHeader(HttpHeaders.AUTHORIZATION) String header) {
        service.delete(user.getId(), token(header));
    }

    // "Bearer xxx" -> "xxx" (o filtro já garantiu que o header começa com "Bearer ")
    private String token(String header) {
        return header.substring(7);
    }
}