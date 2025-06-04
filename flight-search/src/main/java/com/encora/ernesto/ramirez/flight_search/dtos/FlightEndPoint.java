package com.encora.ernesto.ramirez.flight_search.dtos;

import java.time.LocalDateTime;

public class FlightEndPoint {

    private String iataCode;
    private String terminal;
    private LocalDateTime at;

    public String getTerminal() {
        return terminal;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public LocalDateTime getAt() {
        return at;
    }

    public void setAt(LocalDateTime at) {
        this.at = at;
    }

    public String getIataCode() {
        return iataCode;
    }

    public void setIataCode(String iataCode) {
        this.iataCode = iataCode;
    }
}
