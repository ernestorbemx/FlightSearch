package com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints;

import java.util.List;

public class Segments {

    private String id;
    private int numberOfStops;
    private FlightEndPoint departure;
    private FlightEndPoint arrival;
    private String carrierCode;
    private List<FlightStop> stops;
    private int number;


    private AirCraftEquipment aircraft;
    private OperatingFlight operating;

    public AirCraftEquipment getAircraft() {
        return aircraft;
    }

    public void setAircraft(AirCraftEquipment aircraft) {
        this.aircraft = aircraft;
    }

    public OperatingFlight getOperating() {
        return operating;
    }

    public void setOperating(OperatingFlight operating) {
        this.operating = operating;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getId() {
        return id;
    }

    public int getNumberOfStops() {
        return numberOfStops;
    }

    public void setNumberOfStops(int numberOfStops) {
        this.numberOfStops = numberOfStops;
    }

    public FlightEndPoint getDeparture() {
        return departure;
    }

    public void setDeparture(FlightEndPoint departure) {
        this.departure = departure;
    }

    public FlightEndPoint getArrival() {
        return arrival;
    }

    public void setArrival(FlightEndPoint arrival) {
        this.arrival = arrival;
    }

    public String getCarrierCode() {
        return carrierCode;
    }

    public void setCarrierCode(String carrierCode) {
        this.carrierCode = carrierCode;
    }

    public List<FlightStop> getStops() {
        return stops;
    }

    public void setStops(List<FlightStop> stops) {
        this.stops = stops;
    }

    public void setId(String id) {
        this.id = id;
    }
}
