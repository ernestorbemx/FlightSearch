package com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class FareDetailsBySegment {

    private String segmentId;
    private String cabin;
    private String fareBasis;
    private String brandedFare;
    @JsonProperty("class")
    private String bookingClass;
    private boolean isAllotment;
    private BaggageAllowance includedCheckedBags;
    private BaggageAllowance includedCabinBags;
    private List<Amenity> amenities;

    public List<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }

    public BaggageAllowance getIncludedCabinBags() {
        return includedCabinBags;
    }

    public void setIncludedCabinBags(BaggageAllowance includedCabinBags) {
        this.includedCabinBags = includedCabinBags;
    }

    public String getSegmentId() {
        return segmentId;
    }

    public void setSegmentId(String segmentId) {
        this.segmentId = segmentId;
    }

    public String getCabin() {
        return cabin;
    }

    public void setCabin(String cabin) {
        this.cabin = cabin;
    }

    public String getFareBasis() {
        return fareBasis;
    }

    public void setFareBasis(String fareBasis) {
        this.fareBasis = fareBasis;
    }

    public String getBrandedFare() {
        return brandedFare;
    }

    public void setBrandedFare(String brandedFare) {
        this.brandedFare = brandedFare;
    }

    public String getBookingClass() {
        return bookingClass;
    }

    public void setBookingClass(String bookingClass) {
        this.bookingClass = bookingClass;
    }

    public boolean isAllotment() {
        return isAllotment;
    }

    public void setAllotment(boolean allotment) {
        isAllotment = allotment;
    }

    public BaggageAllowance getIncludedCheckedBags() {
        return includedCheckedBags;
    }

    public void setIncludedCheckedBags(BaggageAllowance includedCheckedBags) {
        this.includedCheckedBags = includedCheckedBags;
    }
}
