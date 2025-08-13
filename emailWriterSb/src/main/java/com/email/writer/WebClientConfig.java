package com.email.writer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    WebClient webClient(WebClient.Builder builder,
            @Value("${gemini.api.base}") String baseUrl,
            @Value("${gemini.api.key}") String apiKey) {

        return builder
                .baseUrl(baseUrl)
                .defaultHeader("X-Goog-Api-Key", apiKey) // <— key as header
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
