package com.encora.ernesto.ramirez.flight_search.exceptions;

import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusIssue;

import java.util.List;

public class AmadeusBadRequestException extends RuntimeException {

    private List<AmadeusIssue> errors;

    public AmadeusBadRequestException(String message, List<AmadeusIssue> errors) {
        super(message);
        this.errors = errors;
    }

    public List<AmadeusIssue> getErrors() {
        return errors;
    }

    public void setErrors(List<AmadeusIssue> errors) {
        this.errors = errors;
    }
}
