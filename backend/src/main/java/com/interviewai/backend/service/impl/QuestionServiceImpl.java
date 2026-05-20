package com.interviewai.backend.service.impl;

import com.interviewai.backend.entity.Question;
import com.interviewai.backend.enums.Topic;
import com.interviewai.backend.repository.QuestionRepository;
import com.interviewai.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
    }

    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Long id, Question questionDetails) {
        Question question = getQuestionById(id);
        question.setTitle(questionDetails.getTitle());
        question.setDescription(questionDetails.getDescription());
        question.setDifficulty(questionDetails.getDifficulty());
        question.setTopic(questionDetails.getTopic());
        question.setStarterCode(questionDetails.getStarterCode());
        question.setSolution(questionDetails.getSolution());
        question.setTestCases(questionDetails.getTestCases());
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public List<Question> getQuestionsByTopic(Topic topic) {
        return questionRepository.findByTopic(topic);
    }
}
