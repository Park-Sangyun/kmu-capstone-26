package com.example.recipebackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Getter @Setter
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @Column(name = "name", length = 45)
    private String name; // 재료 이름 자체가 식별자

    @ManyToMany(mappedBy = "ingredients")
    private List<Recipe> recipes = new ArrayList<>();
}
