package com.example.recipebackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Recipe_steps")
@Getter @Setter
@NoArgsConstructor
public class RecipeStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer step;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String text;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Recipes_id")
    private Recipe recipe;
}