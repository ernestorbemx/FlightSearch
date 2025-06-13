package com.encora.ernesto.ramirez.flight_search;

import com.encora.ernesto.ramirez.flight_search.configuration.AmadeusConfigProperties;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusResponse;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.AmadeusResponseDictionary;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.Airline;
import com.encora.ernesto.ramirez.flight_search.dtos.amadeus.endpoints.FlightOffer;
import com.encora.ernesto.ramirez.flight_search.dtos.body.AirportSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.body.FlightSearchDto;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.AccessTokenResponse;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.LocationResponseDto;
import com.encora.ernesto.ramirez.flight_search.services.AmadeusService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.List;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AmadeusServiceTest {

    @Mock
    private WebClient webClient;
    @Mock
    private WebClient.RequestBodyUriSpec requestBodyUriSpec;
    @Mock
    @SuppressWarnings("rawtypes") // to avoid generic warning
    private WebClient.RequestHeadersSpec requestHeadersSpec;
    @Mock
    @SuppressWarnings("rawtypes") // to avoid generic warning
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;
    @Mock
    private WebClient.ResponseSpec responseSpec;
    @Mock
    private AmadeusConfigProperties config;


    @Spy
    @InjectMocks
    private AmadeusService service;

    @BeforeEach
    void setup() {
        ReflectionTestUtils.setField(service, "client", webClient);
        ReflectionTestUtils.setField(service, "config", config);
    }

    @Test
    void testGenerateAccessToken() {
        AccessTokenResponse response = new AccessTokenResponse("test-token");

        when(webClient.post()).thenReturn(requestBodyUriSpec);
        when(requestBodyUriSpec.uri("/v1/security/oauth2/token")).thenReturn(requestBodyUriSpec);
        when(requestBodyUriSpec.contentType(MediaType.APPLICATION_FORM_URLENCODED)).thenReturn(requestBodyUriSpec);
        when(requestBodyUriSpec.bodyValue(any(MultiValueMap.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(AccessTokenResponse.class)).thenReturn(Mono.just(response));

        when(config.getClientId()).thenReturn("clientId");
        when(config.getClientSecret()).thenReturn("clientSecret");

        assertEquals("test-token", service.generateAccessToken()
                .block().getAccessToken());

    }

    @Test
    void testGetAccessTokenCachesValue() {
        // Set a dummy value directly
        ReflectionTestUtils.setField(service, "accessToken", "cached-token");
        assertEquals("cached-token", service.getAccessToken());
    }

    @Test
    void testGetAirports() {
        AirportSearchDto dto = new AirportSearchDto("AIRPORT", "JFK", 10, 0);
        AmadeusResponse<List<LocationResponseDto>> response = new AmadeusResponse<>();
        response.setData(List.of(new LocationResponseDto("AIRPORT", "AIRPORT", "Example", "123", "MEX")));

        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.headers(any())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.onStatus(any(), any())).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(any(ParameterizedTypeReference.class)))
                .thenReturn(Mono.just(response));
        ReflectionTestUtils.setField(service, "accessToken", "token");

        assertEquals("MEX",
                service.getAirports(dto).block().getData().get(0).getIataCode());

    }

    @Test
    void testGetAirport() {
        String id = "LAX";
        AmadeusResponse<LocationResponseDto> response = new AmadeusResponse<>();
        response.setData(new LocationResponseDto("AIRPORT", "AIRPORT", "Example", "123", "LAX"));

        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.headers(any())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.onStatus(any(), any())).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(any(ParameterizedTypeReference.class)))
                .thenReturn(Mono.just(response));
        ReflectionTestUtils.setField(service, "accessToken", "token");


        assertEquals("LAX",
                service.getAirport(id).block().getData().getIataCode());

    }

    @Test
    void testGetAirportsWithRotationHandles401() {
        AirportSearchDto dto = new AirportSearchDto("JFK", "AIRPORT", 10, 0);
        WebClientResponseException ex = WebClientResponseException.create(401, "Unauthorized", null, null, null);

        AmadeusResponse<List<LocationResponseDto>> response = new AmadeusResponse<>();
        response.setData(List.of(new LocationResponseDto("AIRPORT", "AIRPORT", "Example", "123", "JFK")));

        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
        doReturn(Mono.error(ex)).doReturn(Mono.just(response)).when(service).getAirports(dto);
        doReturn(Mono.just(new AccessTokenResponse("new-token"))).when(service).generateAccessToken();
        List<LocationResponseDto> result = service.getAirportsWithRotation(dto);
        assertEquals("JFK", result.get(0).getIataCode());
        Mockito.verify(service, Mockito.times(2)).getAirports(Mockito.any());
        Mockito.verify(service, Mockito.times(1)).generateAccessToken();
    }

    @Test
    void testGetOffers() {
        FlightSearchDto dto = new FlightSearchDto("JFK", "LAX", LocalDate.parse("2025-07-01"), null, "USD",1, false);
        AmadeusResponseDictionary<List<FlightOffer>> response = new AmadeusResponseDictionary<>();
        response.setData(List.of(new FlightOffer()));

        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.headers(any())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.onStatus(any(), any())).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(any(ParameterizedTypeReference.class)))
                .thenReturn(Mono.just(response));
        ReflectionTestUtils.setField(service, "accessToken", "token");


        assertFalse(service.getOffers(dto).block().getData().isEmpty());
    }

    @Test
    void testGetAirline() {
        String code = "AA";
        AmadeusResponse<List<Airline>> response = new AmadeusResponse<>();
        Airline testAirline = new Airline();
        response.setData(List.of(testAirline));

        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.headers(any())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(any(ParameterizedTypeReference.class)))
                .thenReturn(Mono.just(response));
        ReflectionTestUtils.setField(service, "accessToken", "token");

        assertEquals(testAirline, service.getAirline(code).block().getData().get(0));


    }
}
