package com.encora.ernesto.ramirez.flight_search.dtos.responses;

public class LocationResponseDto {

    private String type;
    private String subType;
    private String name;
    private String id;
    private String iataCode;

    public LocationResponseDto(String type, String subType, String name, String id, String iataCode) {
        this.type = type;
        this.subType = subType;
        this.name = name;
        this.id = id;
        this.iataCode = iataCode;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIataCode() {
        return iataCode;
    }

    public void setIataCode(String iataCode) {
        this.iataCode = iataCode;
    }
}
