package com.example.recipebackend.controller;

import com.example.recipebackend.dto.LoginRequest;
import com.example.recipebackend.dto.SignupRequest;
import com.example.recipebackend.entity.User;
import com.example.recipebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        userService.signup(request);
        return "회원가입이 완료되었습니다!";
    }
    @PostMapping("/login") // @GetMapping이 아니라 @PostMapping이어야 합니다!
    public User login(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}