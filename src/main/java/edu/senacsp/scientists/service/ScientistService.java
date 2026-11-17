package edu.senacsp.scientists.service;

import edu.senacsp.scientists.dto.ScientistRequest;
import edu.senacsp.scientists.dto.ScientistResponse;
import edu.senacsp.scientists.entity.Scientist;
import edu.senacsp.scientists.repository.ScientistRepository;

import edu.senacsp.scientists.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ScientistService {

    private final ScientistRepository repository;
    private final UserRepository userRepository;

    public ScientistService(ScientistRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ScientistResponse create(Long userId, ScientistRequest req) {
        validate(req);
        Scientist scientist = new Scientist(req.nome(), req.lattes(), userRepository.getReferenceById(userId));
        return ScientistResponse.from(repository.save(scientist));
    }

    public List<ScientistResponse> findAll(Long userId) {
        return repository.findAllByUserId(userId).stream().map(ScientistResponse::from).toList();
    }

    public ScientistResponse findById(Long userId, Long id) {
        return ScientistResponse.from(find(userId, id));
    }

    @Transactional
    public ScientistResponse update(Long userId, Long id, ScientistRequest req) {
        validate(req);
        Scientist scientist = find(userId, id);
        scientist.setNome(req.nome());
        scientist.setLattes(req.lattes());
        return ScientistResponse.from(repository.save(scientist));
    }

    @Transactional
    public void delete(Long userId, Long id) {
        repository.delete(find(userId, id));
    }

    // Só encontra cientistas que pertencem ao usuário logado
    private Scientist find(Long userId, Long id) {
        return repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Scientist not found"));
    }

    private void validate(ScientistRequest req) {
        if (req.nome() == null || req.nome().isBlank() || req.lattes() == null || req.lattes().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "nome and lattes are required");
        }
    }
}