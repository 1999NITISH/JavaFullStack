package com.interviewai.backend.service.impl;

import com.interviewai.backend.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiServiceImpl implements AiService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    @Override
    public String generateInterviewQuestion(String type) {
        String prompt = "Act as a technical interviewer. Generate a " + type + " interview question for a software engineer role.";
        return callOpenAi(prompt);
    }

    @Override
    public Map<String, Object> evaluateAnswer(String question, String answer) {
        String prompt = "Evaluate the following answer to the interview question: \"" + question + "\". Answer: \"" + answer + "\". Provide a score out of 100 and feedback.";
        String response = callOpenAi(prompt);
        
        Map<String, Object> evaluation = new HashMap<>();
        evaluation.put("aiFeedback", response);
        evaluation.put("score", 85); // Simplified for now
        return evaluation;
    }

    @Override
    public Map<String, Object> analyzeResume(String resumeText) {
        String prompt = "Analyze this resume text for ATS compatibility. Extract skills and provide a score: " + resumeText;
        String response = callOpenAi(prompt);

        Map<String, Object> analysis = new HashMap<>();
        analysis.put("aiFeedback", response);
        analysis.put("atsScore", 75);
        analysis.put("extractedSkills", "Java, Spring Boot, React");
        return analysis;
    }

    private String callOpenAi(String prompt) {
        if (apiKey == null || apiKey.equals("your_default_key_here")) {
            return "AI feature is in simulation mode. Please provide a valid OpenAI API key to enable live responses.";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, entity, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            return "Error calling OpenAI: " + e.getMessage();
        }
    }
}
