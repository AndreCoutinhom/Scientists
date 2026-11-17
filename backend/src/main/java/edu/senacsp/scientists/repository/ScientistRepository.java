package edu.senacsp.scientists.repository;

import edu.senacsp.scientists.entity.Scientist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScientistRepository extends JpaRepository<Scientist, Long> {
    List<Scientist> findAllByUserId(Long userId);
    Optional<Scientist> findByIdAndUserId(Long id, Long userId);
}
