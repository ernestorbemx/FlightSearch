package com.encora.ernesto.ramirez.flight_search.dtos;

import java.util.List;

public class FlightOffer {

    private String id;
    private String source;
    private int numberOfBookableSeats;
    private List<Itineraries> itineraries;
    private FlightPrice price;
    private List<TravelerPricing> travelerPricings;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<TravelerPricing> getTravelerPricings() {
        return travelerPricings;
    }

    public void setTravelerPricings(List<TravelerPricing> travelerPricings) {
        this.travelerPricings = travelerPricings;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public int getNumberOfBookableSeats() {
        return numberOfBookableSeats;
    }

    public void setNumberOfBookableSeats(int numberOfBookableSeats) {
        this.numberOfBookableSeats = numberOfBookableSeats;
    }

    public List<Itineraries> getItineraries() {
        return itineraries;
    }

    public void setItineraries(List<Itineraries> itineraries) {
        this.itineraries = itineraries;
    }

    public FlightPrice getPrice() {
        return price;
    }

    public void setPrice(FlightPrice price) {
        this.price = price;
    }
}
