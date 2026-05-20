package com.interviewai.backend.service.impl;

import com.interviewai.backend.dto.SubmissionRequest;
import com.interviewai.backend.entity.Question;
import com.interviewai.backend.entity.Submission;
import com.interviewai.backend.entity.User;
import com.interviewai.backend.enums.SubmissionStatus;
import com.interviewai.backend.repository.QuestionRepository;
import com.interviewai.backend.repository.SubmissionRepository;
import com.interviewai.backend.repository.UserRepository;
import com.interviewai.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Submission submitCode(SubmissionRequest request, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // In a real application, we would call Judge0 API here.
        // For now, we simulate a successful submission.
        Submission submission = Submission.builder()
                .code(request.getCode())
                .language(request.getLanguage())
                .status(SubmissionStatus.ACCEPTED)
                .score(100)
                .executionTime(0.5)
                .user(user)
                .question(question)
                .build();

        // Update user score
        user.setTotalScore(user.getTotalScore() + 100);
        userRepository.save(user);

        return submissionRepository.save(submission);
    }

    @Override
    public List<Submission> getUserSubmissions(Long userId) {
        return submissionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
