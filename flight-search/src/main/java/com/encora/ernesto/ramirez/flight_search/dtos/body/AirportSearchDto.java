package com.encora.ernesto.ramirez.flight_search.dtos.body;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Airport search parameters")
public class AirportSearchDto {
    @NotEmpty
    @Schema(description = "City or airport name or code")
    private String keyword; // City or airport name or code
    @NotEmpty
    @Schema(description = "CITY or AIRPORT at the moment")
    private String subtype; // CITY or AIRPORT
    @NotNull
    @Min(1)
    private int pageSize;
    @NotNull
    @Min(0)
    private int offset;

    public AirportSearchDto(String keyword, String subtype, int pageSize, int offset) {
        this.keyword = keyword;
        this.subtype = subtype;
        this.pageSize = pageSize;
        this.offset = offset;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    @Override
    public String toString() {
        return "AirportSearchDto{" +
                "keyword='" + keyword + '\'' +
                ", subtype='" + subtype + '\'' +
                ", pageSize=" + pageSize +
                ", offset=" + offset +
                '}';
    }
}
