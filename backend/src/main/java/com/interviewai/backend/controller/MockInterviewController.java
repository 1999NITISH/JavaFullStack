package com.interviewai.backend.controller;

import com.interviewai.backend.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mock-interview")
public class MockInterviewController {

    @Autowired
    private AiService aiService;

    @PostMapping("/start")
    public Map<String, String> startInterview(@RequestBody Map<String, String> request) {
        String type = request.getOrDefault("type", "Technical");
        String question = aiService.generateInterviewQuestion(type);
        return Map.of("question", question);
    }

    @PostMapping("/evaluate")
    public Map<String, Object> evaluateAnswer(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        String answer = request.get("answer");
        return aiService.evaluateAnswer(question, answer);
    }
}
