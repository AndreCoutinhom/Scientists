package edu.senacsp.scientists.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "scientist")
public class Scientist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String lattes;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    protected Scientist() {} // Hibernate

    public Scientist(String nome, String lattes, User user) {
        this.nome = nome;
        this.lattes = lattes;
        this.user = user;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getLattes() { return lattes; }
    public void setLattes(String lattes) { this.lattes = lattes; }
    public User getUser() { return user; }
}
