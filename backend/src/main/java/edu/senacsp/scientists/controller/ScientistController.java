package edu.senacsp.scientists.controller;

import edu.senacsp.scientists.dto.ScientistRequest;
import edu.senacsp.scientists.dto.ScientistResponse;
import edu.senacsp.scientists.entity.User;
import edu.senacsp.scientists.service.ScientistService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scientist")
public class ScientistController {

    private final ScientistService service;

    public ScientistController(ScientistService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ScientistResponse> create(@AuthenticationPrincipal User user,
                                                    @RequestBody ScientistRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(user.getId(), req));
    }

    @GetMapping
    public List<ScientistResponse> findAll(@AuthenticationPrincipal User user) {
        return service.findAll(user.getId());
    }

    @GetMapping("/{id}")
    public ScientistResponse findById(@AuthenticationPrincipal User user, @PathVariable Long id) {
        return service.findById(user.getId(), id);
    }

    @PutMapping("/{id}")
    public ScientistResponse update(@AuthenticationPrincipal User user,
                                    @PathVariable Long id,
                                    @RequestBody ScientistRequest req) {
        return service.update(user.getId(), id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        service.delete(user.getId(), id);
    }
}