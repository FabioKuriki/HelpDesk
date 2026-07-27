package org.helpDesk.shared.jwt;

import io.smallrye.jwt.algorithm.SignatureAlgorithm;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.build.Jwt;
import io.smallrye.jwt.build.JwtClaimsBuilder;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.*;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.helpDesk.domain.user.User;
import java.time.Instant;

@ApplicationScoped
public class JwtService {
    @ConfigProperty(name = "mp.jwt.token.cookie")
    String COOKIE_NAME;

    Integer EXPIRATION_TIME = 3600;

    @Inject
    JWTParser parser;

    public String generateJwt(User user){
        JwtClaimsBuilder builder = Jwt.claims();
        return builder
                .subject(user.getId().toString())
                .groups(user.getProfile().toString())
                .expiresAt(Instant.now().plusSeconds(EXPIRATION_TIME))
                .jws().algorithm(SignatureAlgorithm.RS256).sign();
    }

    public JsonWebToken extractSubject(String token){
        try {
            return parser.parse(token);

        } catch (Exception e) {
            throw new RuntimeException("Token inválido", e);
        }
    }

    public Response generateCookie(User user){
        NewCookie cookie = new NewCookie.Builder(COOKIE_NAME)
                .value(generateJwt(user))
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(EXPIRATION_TIME)
                .build();

        return Response.ok()
                .cookie(cookie)
                .build();
    }

    @Context
    HttpHeaders headers;

    public JsonWebToken getCookieValue() {
        Cookie cookie = headers.getCookies().get(COOKIE_NAME);
        return cookie != null ? extractSubject(cookie.getValue()) : null;
    }

    public Response removeCookie() {
        NewCookie expiredCookie = new NewCookie.Builder(COOKIE_NAME)
                .value("")
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(0)
                .build();

        return Response.ok()
                .cookie(expiredCookie)
                .build();
    }
}
