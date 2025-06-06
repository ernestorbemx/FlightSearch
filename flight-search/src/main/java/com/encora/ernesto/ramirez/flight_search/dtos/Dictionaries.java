package com.encora.ernesto.ramirez.flight_search.dtos;

import java.util.List;
import java.util.Map;

public class Dictionaries {

    private Map<String, LocationEntry> locations;
    private Map<String, String> aircraft;

    public Map<String, String> getAircraft() {
        return aircraft;
    }

    public void setAircraft(Map<String, String> aircraft) {
        this.aircraft = aircraft;
    }

    public Map<String, LocationEntry> getLocations() {
        return locations;
    }

    public void setLocations(Map<String, LocationEntry> locations) {
        this.locations = locations;
    }
}
