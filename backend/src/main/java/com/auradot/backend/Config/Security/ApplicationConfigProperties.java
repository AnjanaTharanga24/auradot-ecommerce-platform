package com.auradot.backend.Config.Security;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@ConfigurationProperties("app")
@Configuration
public class ApplicationConfigProperties {


    private Jwt jwt;

    @Data
    public static class Jwt {

        private Long accessTokenExpiration;

        private String signingKey;

        private String authoritiesKey;

        private String tokenPrefix;

        private String headerString;

    }


}