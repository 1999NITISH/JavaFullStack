package com.interviewai.backend.service;

import com.interviewai.backend.entity.Question;
import com.interviewai.backend.enums.Topic;

import java.util.List;

public interface QuestionService {
    List<Question> getAllQuestions();
    Question getQuestionById(Long id);
    Question createQuestion(Question question);
    Question updateQuestion(Long id, Question question);
    void deleteQuestion(Long id);
    List<Question> getQuestionsByTopic(Topic topic);
}
