package org.helpDesk.domain.user.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(UUID userId) {
        super("Usuário de ID: " + userId + " nao encontrado");
    }
}
