package com.interviewai.backend.repository;

import com.interviewai.backend.entity.Submission;
import com.interviewai.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUser(User user);
    List<Submission> findByUserIdOrderByCreatedAtDesc(Long userId);
}
