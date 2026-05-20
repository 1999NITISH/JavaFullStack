package com.interviewai.backend.service;

import com.interviewai.backend.entity.Submission;
import com.interviewai.backend.dto.SubmissionRequest;

import java.util.List;

public interface SubmissionService {
    Submission submitCode(SubmissionRequest request, Long userId);
    List<Submission> getUserSubmissions(Long userId);
}
