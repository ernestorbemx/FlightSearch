package com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints;

public class Amenity {

    private String description;
    private boolean isChargeable;
    private String amenityType;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isChargeable() {
        return isChargeable;
    }

    public void setChargeable(boolean chargeable) {
        isChargeable = chargeable;
    }

    public String getAmenityType() {
        return amenityType;
    }

    public void setAmenityType(String amenityType) {
        this.amenityType = amenityType;
    }
}
