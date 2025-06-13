package com.encora.ernesto.ramirez.flight_search;

import com.encora.ernesto.ramirez.flight_search.services.AmadeusService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest

public class AmadeusServiceIntegrationTest {

    @Autowired
    private AmadeusService service;

    @Test
    void accessTokenIsGenerated() {
        String token = service.generateAccessToken().map(r -> r.getAccessToken()).block();
        assertNotNull(token);
    }


}
