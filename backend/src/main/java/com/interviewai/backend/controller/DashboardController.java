package com.interviewai.backend.controller;

import com.interviewai.backend.entity.User;
import com.interviewai.backend.repository.UserRepository;
import com.interviewai.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public Map<String, Object> getDashboardData() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSolved", user.getSubmissions().size());
        stats.put("accuracy", 85.5); // Mock
        stats.put("totalScore", user.getTotalScore());
        stats.put("recentSubmissions", user.getSubmissions());
        
        return stats;
    }
}
