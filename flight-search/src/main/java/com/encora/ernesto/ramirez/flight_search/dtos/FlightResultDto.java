package com.encora.ernesto.ramirez.flight_search.dtos;

import java.time.LocalDate;

public class FlightResultDto {
    private LocalDate departureDate; // source of the flight offer
    private LocalDate arrivalDate; // source of the flight offer
    private String departureAirport; // source of the flight offer
    private String departureAirportCode; // source of the flight offer
    private String arrivalAirport; // source of the flight offer
    private String arrivalAirportCode; // source of the flight offer
    private String airlineCode;
    private String airline;
    private double basePrice; // no taxes
//    private double grandTotal; // no taxes
//    private double basePrice; // no taxes
    private String currency; // currency

}
