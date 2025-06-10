package com.encora.ernesto.ramirez.flight_search.dtos.amadeus;

import java.util.List;

public class Amadeus400Error {
    private List<AmadeusIssue> errors;

    public List<AmadeusIssue> getErrors() {
        return errors;
    }

    public void setErrors(List<AmadeusIssue> errors) {
        this.errors = errors;
    }

}
