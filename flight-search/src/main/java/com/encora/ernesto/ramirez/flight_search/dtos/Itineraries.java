package com.encora.ernesto.ramirez.flight_search.dtos;

import java.util.List;

public class Itineraries {

    private String duration;
    private List<Segments> segments;

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<Segments> getSegments() {
        return segments;
    }

    public void setSegments(List<Segments> segments) {
        this.segments = segments;
    }
}
