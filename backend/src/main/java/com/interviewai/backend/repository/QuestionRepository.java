package com.interviewai.backend.repository;

import com.interviewai.backend.entity.Question;
import com.interviewai.backend.enums.Difficulty;
import com.interviewai.backend.enums.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTopic(Topic topic);
    List<Question> findByDifficulty(Difficulty difficulty);
}
