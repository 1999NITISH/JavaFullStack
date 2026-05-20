package com.interviewai.backend.dto;

import lombok.Data;

@Data
public class SubmissionRequest {

    private Long questionId;
    private String code;
    private String language;
    private Integer languageId;
}