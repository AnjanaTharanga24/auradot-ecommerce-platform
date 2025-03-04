package com.auradot.backend.Config.Security;


import com.auradot.backend.model.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Component
@AllArgsConstructor
@Slf4j
public class TokenProvider implements Serializable {

    private final ApplicationConfigProperties applicationProperties;
    private static final String TOKEN_PREFIX = "Bearer";


    public String getUsernameFromToken(String token) {

        return extractClaim(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(applicationProperties.getJwt().getSigningKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserModel user) {
        return Jwts.builder()
                .setSubject(user.getUserName())
                .claim("role", user.getRole().getRoleName())
                .claim("user_id", user.getUserId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (applicationProperties.getJwt().getAccessTokenExpiration() * 1000 * 12 * 24)))

                .signWith(getSigningKey())
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        log.info("ok");
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public UsernamePasswordAuthenticationToken getAuthenticationToken(final String token, final UserDetails userDetails) {
        log.info("getAuthenticationToken");
        String role = getRoleFromToken(token);
        return new UsernamePasswordAuthenticationToken(userDetails, "",
                List.of(new SimpleGrantedAuthority(role)));
    }

    public String getRoleFromToken(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = extractAllClaims(token);
        return Long.valueOf(claims.get("user_id").toString());
    }

    public Object extractTokenFromHeader(String header){
        if (!header.startsWith(TOKEN_PREFIX)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid token format");
        }

        String authToken = header.replace(TOKEN_PREFIX + " ", "");
        return authToken;
    }
}