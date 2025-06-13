package com.encora.ernesto.ramirez.flight_search.dtos.body;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class FlightSearchDto {

    @NotBlank
    @NotEmpty
    private String departureAirport;
    @NotBlank
    @NotEmpty
    private String arrivalAirport;
    @NotNull
    private LocalDate departureDate;
    private LocalDate returnDate;
    @NotEmpty
    private String currency;
    @NotNull
    @Min(1)
    @Max(9)
    private int numberAdults;
    @NotNull
    private boolean nonStop;

    public FlightSearchDto(String departureAirport, String arrivalAirport, LocalDate departureDate, LocalDate returnDate, String currency, int numberAdults, boolean nonStop) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.currency = currency;
        this.numberAdults = numberAdults;
        this.nonStop = nonStop;
    }

    public String getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public int getNumberAdults() {
        return numberAdults;
    }

    public void setNumberAdults(int numberAdults) {
        this.numberAdults = numberAdults;
    }

    public boolean isNonStop() {
        return nonStop;
    }

    public void setNonStop(boolean nonStop) {
        this.nonStop = nonStop;
    }

    @Override
    public String toString() {
        return "FlightSearchDto{" +
                "departureAirport='" + departureAirport + '\'' +
                ", arrivalAirport='" + arrivalAirport + '\'' +
                ", departureDate=" + departureDate +
                ", returnDate=" + returnDate +
                ", currency='" + currency + '\'' +
                ", numberAdults=" + numberAdults +
                ", nonStop=" + nonStop +
                '}';
    }
}
