package com.interviewai.backend.service;

import java.util.Map;

public interface AiService {
    String generateInterviewQuestion(String type);
    Map<String, Object> evaluateAnswer(String question, String answer);
    Map<String, Object> analyzeResume(String resumeText);
}
