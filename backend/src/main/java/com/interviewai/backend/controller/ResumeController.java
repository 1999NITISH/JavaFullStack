package com.interviewai.backend.controller;

import com.interviewai.backend.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private AiService aiService;

    @PostMapping("/analyze")
    public Map<String, Object> analyzeResume(@RequestBody Map<String, String> request) {
        String resumeText = request.get("resumeText");
        return aiService.analyzeResume(resumeText);
    }

    // Mock upload for now
    @PostMapping("/upload")
    public Map<String, String> uploadResume(@RequestParam("file") MultipartFile file) {
        return Map.of("url", "https://mock-resume-url.com/" + file.getOriginalFilename());
    }
}
