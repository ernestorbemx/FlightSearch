package com.encora.ernesto.ramirez.flight_search.controllers;

import com.encora.ernesto.ramirez.flight_search.dtos.*;
import com.encora.ernesto.ramirez.flight_search.services.AmadeusService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AppController {

    @Autowired
    private AmadeusService service;

    @GetMapping("airports")
    public List<LocationResponseDto> getAirport(@Valid @ModelAttribute AirportSearchDto dto) {
        return service.getAirportsWithRotation(dto);
    }

    @GetMapping("flights")
    public List<FlightOffer> getOffers(@Valid @ModelAttribute FlightSearchDto dto) {
        return service.getOffersWithRotation(dto);
    }

    @GetMapping("airline")
    public List<Airline> getOffers(@Valid @ModelAttribute("code") String code ) {
        return service.getAirlineWithRotation(code);
    }

}
