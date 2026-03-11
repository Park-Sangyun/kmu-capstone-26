package com.example.recipebackend.service;

import com.example.recipebackend.dto.SignupRequest;
import com.example.recipebackend.entity.User;
import com.example.recipebackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // 이 어노테이션이 있어야 'bean'으로 등록되어 오토와이어링이 가능해집니다!
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void signup(SignupRequest request) {
        // 이메일 중복 체크 로직 (나중에 추가 가능)

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // 비밀번호는 나중에 암호화할 거예요!
        user.setNickname(request.getNickname());

        userRepository.save(user);
    }

    public User login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)) // 비밀번호 비교
                .orElseThrow(() -> new RuntimeException("이메일 또는 비밀번호가 틀립니다."));
    }
}