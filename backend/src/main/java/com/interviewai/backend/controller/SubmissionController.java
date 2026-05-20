package com.interviewai.backend.controller;

import com.interviewai.backend.dto.SubmissionRequest;
import com.interviewai.backend.entity.Submission;
import com.interviewai.backend.security.UserDetailsImpl;
import com.interviewai.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping
    public Submission submitCode(@RequestBody SubmissionRequest request) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return submissionService.submitCode(request, userDetails.getId());
    }

    @GetMapping("/user/{id}")
    public List<Submission> getUserSubmissions(@PathVariable Long id) {
        return submissionService.getUserSubmissions(id);
    }
}
