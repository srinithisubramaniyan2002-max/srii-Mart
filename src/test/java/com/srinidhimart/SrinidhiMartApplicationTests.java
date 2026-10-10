package com.srinidhimart;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("h2")
class SrinidhiMartApplicationTests {

    @Test
    void contextLoads() {
        // Verifies Spring context loads successfully with H2 profile
    }
}
