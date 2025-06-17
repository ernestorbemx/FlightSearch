package com.encora.ernesto.ramirez.flight_search.controllers;

import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusResponseDictionary;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.Airline;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.FlightOffer;
import com.encora.ernesto.ramirez.flight_search.dtos.body.AirportSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.body.FlightSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.LocationResponseDto;
import com.encora.ernesto.ramirez.flight_search.services.AmadeusService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/")
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:8080", "http://127.0.0.1:5173", "http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:3000"})
@RestController
public class AppController {

    @Autowired
    private AmadeusService service;

    @GetMapping("airports")
    public List<LocationResponseDto> getAirports(@Valid @ModelAttribute AirportSearchDto dto) {
        return service.getAirportsWithRotation(dto);
    }

    @GetMapping("airports/{id}")
    public LocationResponseDto getAirport(@Valid @PathVariable("id") String id) {
        return service.getAirportWithRotation(id);
    }

    @GetMapping("flights")
    public AmadeusResponseDictionary<List<FlightOffer>> getOffers(@Valid @ModelAttribute FlightSearchDto dto) {
        return service.getOffersWithRotation(dto);
    }

    @GetMapping("airline")
    public List<Airline> getOffers(@Valid @ModelAttribute("code") String code ) {
        return service.getAirlineWithRotation(code);
    }

}
