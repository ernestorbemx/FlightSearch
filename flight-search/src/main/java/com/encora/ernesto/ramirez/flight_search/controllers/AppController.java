package com.encora.ernesto.ramirez.flight_search.controllers;

import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusResponseDictionary;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.Airline;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.FlightOffer;
import com.encora.ernesto.ramirez.flight_search.dtos.body.AirportSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.body.FlightSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.BadRequestResponse;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.LocationResponseDto;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.ValidationErrorResponse;
import com.encora.ernesto.ramirez.flight_search.services.AmadeusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;

@RequestMapping("/")
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:8080", "http://127.0.0.1:5173", "http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:3000"})
@RestController
public class AppController {

    @Autowired
    private AmadeusService service;

    @Operation(
            summary = "Get an array of airports given a keyword",
            description = "Given a keyword and a type AIRPORT and/or CITY return a set of paginated airports."
    )
    @ApiResponse(responseCode = "400", description = "Amadeus responded with 400 or Dto is not valid ", content = @Content(schema = @Schema(oneOf = {BadRequestResponse.class, ValidationErrorResponse.class})))
    @ApiResponse(responseCode = "500", description = "Internal error ", content = @Content(schema = @Schema(implementation = WebClientResponseException.InternalServerError.class)))
    @GetMapping("airports")
    public List<LocationResponseDto> getAirports(@Valid @ModelAttribute AirportSearchDto dto) {
        return service.getAirportsWithRotation(dto);
    }

    @Operation(
            summary = "Return an airport information given its ID.",
            description = "Return an airport information given its ID, this differs from IATA codes"
    )
    @ApiResponse(responseCode = "400", description = "Amadeus responded with 400 or Dto is not valid ", content = @Content(schema = @Schema(oneOf = {BadRequestResponse.class, ValidationErrorResponse.class})))
    @ApiResponse(responseCode = "500", description = "Internal error ", content = @Content(schema = @Schema(implementation = WebClientResponseException.InternalServerError.class)))
    @GetMapping("airports/{id}")
    public LocationResponseDto getAirport(@Valid @PathVariable("id") String id) {
        return service.getAirportWithRotation(id);
    }

    @Operation(
            summary = "Return an list of flight offers given search parameters.",
            description = "Return an list of flight offers given search parameters, "
    )
    @ApiResponse(responseCode = "400", description = "Amadeus responded with 400 or Dto is not valid ", content = @Content(schema = @Schema(oneOf = {BadRequestResponse.class, ValidationErrorResponse.class})))
    @ApiResponse(responseCode = "500", description = "Internal error ", content = @Content(schema = @Schema(implementation = WebClientResponseException.InternalServerError.class)))
    @GetMapping("flights")
    public AmadeusResponseDictionary<List<FlightOffer>> getOffers(@Valid @ModelAttribute FlightSearchDto dto) {
        return service.getOffersWithRotation(dto);
    }

    @Operation(
            summary = "Return a list of airline given airline code.",
            description = "Return a list of airline given airline code. "
    )
    @ApiResponse(responseCode = "400", description = "Amadeus responded with 400 or Dto is not valid ", content = @Content(schema = @Schema(oneOf = {BadRequestResponse.class, ValidationErrorResponse.class})))
    @ApiResponse(responseCode = "500", description = "Internal error ", content = @Content(schema = @Schema(implementation = WebClientResponseException.InternalServerError.class)))
    @GetMapping("airline")
    public List<Airline> getAirline(@Valid @ModelAttribute("code") String code) {
        return service.getAirlineWithRotation(code);
    }

}
