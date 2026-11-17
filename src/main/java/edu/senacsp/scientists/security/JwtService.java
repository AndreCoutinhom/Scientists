package edu.senacsp.scientists.security;

import edu.senacsp.scientists.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class JwtService {

    private final SecretKey key;
    private final long expiration;

    // jti -> data de expiração do token revogado (logout)
    private final Map<String, Date> revoked = new ConcurrentHashMap<>();

    public JwtService(@Value("${jwt.key}") String secret,
                      @Value("${jwt.expiration-ms}") long expiration) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        this.expiration = expiration;
    }

    public String generateToken(User user) {
        Date now = new Date();
        return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration))
                .signWith(key)
                .compact();
    }

    /** Retorna o id do usuário se o token for válido e não tiver sido revogado. */
    public Optional<Long> extractUserId(String token) {
        return parse(token)
                .filter(claims -> !revoked.containsKey(claims.getId()))
                .map(claims -> claims.get("userId", Number.class))
                .map(Number::longValue);
    }

    /** Invalida o token (logout). Tokens revogados já expirados são descartados da lista. */
    public void revoke(String token) {
        parse(token).ifPresent(claims -> {
            long now = System.currentTimeMillis();
            revoked.values().removeIf(exp -> exp.getTime() < now);
            revoked.put(claims.getId(), claims.getExpiration());
        });
    }

    private Optional<Claims> parse(String token) {
        try {
            return Optional.of(Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(token)
                    .getPayload());
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}
