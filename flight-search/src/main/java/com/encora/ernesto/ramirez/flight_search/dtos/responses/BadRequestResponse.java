package com.encora.ernesto.ramirez.flight_search.dtos.responses;

import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusIssue;

import java.util.List;

public class BadRequestResponse {
    private String message;
    private List<AmadeusIssue> errors;

    public BadRequestResponse(String message, List<AmadeusIssue> errors) {
        this.message = message;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<AmadeusIssue> getErrors() {
        return errors;
    }

    public void setErrors(List<AmadeusIssue> errors) {
        this.errors = errors;
    }
}
