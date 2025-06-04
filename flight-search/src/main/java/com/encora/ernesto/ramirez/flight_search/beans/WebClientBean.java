package com.encora.ernesto.ramirez.flight_search.beans;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Configuration
public class WebClientBean {
    @Bean
    public WebClient webClient() {
        HttpClient client = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(30));

        return WebClient
                .builder()

                .baseUrl("https://test.api.amadeus.com/")
                .codecs(codecs -> codecs
                .defaultCodecs()
                .maxInMemorySize(2048 * 1024))
                .build();
    }
}
