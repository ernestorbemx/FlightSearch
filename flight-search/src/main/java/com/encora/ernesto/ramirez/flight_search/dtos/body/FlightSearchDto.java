package com.encora.ernesto.ramirez.flight_search.dtos.body;

import com.encora.ernesto.ramirez.flight_search.validation.ValidDateRange;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Schema(description = "Flight offers search parameters")
@ValidDateRange
public class FlightSearchDto {

    @NotBlank
    @NotEmpty
    @Schema(description = "Departure airport IATA Code")
    private String departureAirport;
    @NotBlank
    @NotEmpty
    @Schema(description = "Arrival airport IATA Code")
    private String arrivalAirport;
    @NotNull
    @Schema(description = "Departure date")
    private LocalDate departureDate;
    @Schema(description = "Return date (cannot be before departureDate)")
    private LocalDate returnDate;
    @NotEmpty
    @Schema(description = "Currency on ISO format (USD, MXN, EUR)")
    private String currency;
    @NotNull
    @Min(1)
    @Max(9)
    @Schema(description = "Number of adults seats to search for")
    private int numberAdults;
    @NotNull
    @Schema(description = "Should flight offers include stops?")
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
