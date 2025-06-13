package com.encora.ernesto.ramirez.flight_search.services;

import com.encora.ernesto.ramirez.flight_search.configuration.AmadeusConfigProperties;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.Amadeus400Error;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusResponse;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusResponseDictionary;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.Airline;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.FlightOffer;
import com.encora.ernesto.ramirez.flight_search.dtos.body.AirportSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.body.FlightSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.AccessTokenResponse;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.LocationResponseDto;
import com.encora.ernesto.ramirez.flight_search.exceptions.AmadeusBadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class AmadeusService {

    @Autowired
    private WebClient client;

    @Autowired
    private AmadeusConfigProperties config;

    private String accessToken;


    public Mono<AccessTokenResponse> generateAccessToken() {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
//        System.out.println(config.getClientId());
//        System.out.println(config.getClientSecret());
        formData.add("grant_type", "client_credentials");
        formData.add("client_id", config.getClientId());
        formData.add("client_secret", config.getClientSecret());
//        System.out.println(formData.toString());
        return client
                .post()
                .uri("/v1/security/oauth2/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(AccessTokenResponse.class);
    }

    public String getAccessToken() {
        if (accessToken == null)
            accessToken = generateAccessToken().map(AccessTokenResponse::getAccessToken).block();
        return accessToken;
    }

    public Mono<AmadeusResponse<List<LocationResponseDto>>> getAirports(AirportSearchDto search) {

        return client
                .get()
                .uri(uriBuilder ->
                        uriBuilder.path("/v1/reference-data/locations")
                                .queryParam("subType", search.getSubtype())
                                .queryParam("keyword", search.getKeyword())
                                .queryParam("page[limit]", search.getPageSize())
                                .queryParam("page[offset]", search.getOffset())
                                .queryParam("sort", "analytics.travelers.score")
                                .build()
                )
                .headers(h -> h.setBearerAuth(getAccessToken()))
                .retrieve()
                .onStatus(code -> code.isSameCodeAs(HttpStatus.BAD_REQUEST),
                        clientResponse -> clientResponse.bodyToMono(Amadeus400Error.class)
                                .map(body -> new AmadeusBadRequestException("API returned 400 error: ", body.getErrors())
                                ))
                .bodyToMono(new ParameterizedTypeReference<AmadeusResponse<List<LocationResponseDto>>>() {
                });
    }

    public Mono<AmadeusResponse<LocationResponseDto>> getAirport(String id) {

        return client
                .get()
                .uri(uriBuilder ->
                        uriBuilder.path("/v1/reference-data/locations/" + id)
                                .build()
                )
                .headers(h -> h.setBearerAuth(getAccessToken()))
                .retrieve()
                .onStatus(code -> code.isSameCodeAs(HttpStatus.BAD_REQUEST),
                        clientResponse -> clientResponse.bodyToMono(Amadeus400Error.class)
                                .map(body -> new AmadeusBadRequestException("API returned 400 error: ", body.getErrors())
                                ))
                .bodyToMono(new ParameterizedTypeReference<AmadeusResponse<LocationResponseDto>>() {
                });
    }

    public Mono<AmadeusResponseDictionary<List<FlightOffer>>> getOffers(FlightSearchDto search) {

        return client
                .get()
                .uri(uriBuilder ->
                        {
                            UriBuilder builder =
                                    uriBuilder.path("/v2/shopping/flight-offers")
                                            .queryParam("originLocationCode", search.getDepartureAirport())
                                            .queryParam("destinationLocationCode", search.getArrivalAirport())
                                            .queryParam("departureDate", search.getDepartureDate())
                                            .queryParam("adults", search.getNumberAdults())
                                            .queryParam("max", 20);

                            if (search.getReturnDate() == null) {
                                return builder.build();
                            }
                            return builder
                                    .queryParam("returnDate", search.getReturnDate())
                                    .build();
                        }
                )
                .headers(h -> h.setBearerAuth(getAccessToken()))
                .retrieve()
                .onStatus(code -> code.isSameCodeAs(HttpStatus.BAD_REQUEST),
                        clientResponse -> clientResponse.bodyToMono(Amadeus400Error.class)
                                .map(body -> new AmadeusBadRequestException("API returned 400 error: ", body.getErrors())
                                ))
                .bodyToMono(new ParameterizedTypeReference<AmadeusResponseDictionary<List<FlightOffer>>>() {
                });
    }

    public Mono<AmadeusResponse<List<Airline>>> getAirline(String airlineCode) {

        return client
                .get()
                .uri(uriBuilder ->
                        uriBuilder.path("/v1/reference-data/airlines")
                                .queryParam("airlineCodes", airlineCode)
                                .build()
                )
                .headers(h -> h.setBearerAuth(getAccessToken()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<AmadeusResponse<List<Airline>>>() {
                });
    }

    public List<LocationResponseDto> getAirportsWithRotation(AirportSearchDto dto) {
        return getAirports(dto)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                        return generateAccessToken().map(accessTokenResponse -> accessToken = accessTokenResponse.getAccessToken()).flatMap(r -> getAirports(dto));
                    }
                    return Mono.error(e);
                })
                .block()
                .getData();

    }

    public LocationResponseDto getAirportWithRotation(String id) {
        return getAirport(id)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                        return generateAccessToken().map(accessTokenResponse -> accessToken = accessTokenResponse.getAccessToken()).flatMap(r -> getAirport(id));
                    }
                    return Mono.error(e);
                })
                .block()
                .getData();

    }

    public AmadeusResponseDictionary<List<FlightOffer>> getOffersWithRotation(FlightSearchDto dto) {
        return getOffers(dto)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                        return generateAccessToken().map(accessTokenResponse -> accessToken = accessTokenResponse.getAccessToken()).flatMap(r -> getOffers(dto));
                    }
                    return Mono.error(e);
                })
                .block();
    }

    public List<Airline> getAirlineWithRotation(String dto) {
        return getAirline(dto)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                        return generateAccessToken().map(accessTokenResponse -> accessToken = accessTokenResponse.getAccessToken()).flatMap(r -> getAirline(dto));
                    }
                    return Mono.error(e);
                })
                .block()
                .getData();
    }


}
