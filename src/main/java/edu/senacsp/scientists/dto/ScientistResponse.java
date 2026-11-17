package edu.senacsp.scientists.dto;

import edu.senacsp.scientists.entity.Scientist;

public record ScientistResponse(Long id, String nome, String lattes) {

    public static ScientistResponse from(Scientist s) {
        return new ScientistResponse(s.getId(), s.getNome(), s.getLattes());
    }
}
