package com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints;

import java.util.List;

public class TravelerPricing {
    private FlightPrice price;
    private String travelerType;
    private List<FareDetailsBySegment> fareDetailsBySegment;

    public String getTravelerType() {
        return travelerType;
    }

    public void setTravelerType(String travelerType) {
        this.travelerType = travelerType;
    }

    public FlightPrice getPrice() {
        return price;
    }

    public void setPrice(FlightPrice price) {
        this.price = price;
    }

    public List<FareDetailsBySegment> getFareDetailsBySegment() {
        return fareDetailsBySegment;
    }

    public void setFareDetailsBySegment(List<FareDetailsBySegment> fareDetailsBySegment) {
        this.fareDetailsBySegment = fareDetailsBySegment;
    }
}
