package com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints;

public class Tax {
    private double amount;
    private String code;

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
