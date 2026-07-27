package org.helpDesk.domain.user.exception;

public class UserNotLoggedInException extends RuntimeException {
    public UserNotLoggedInException() {
        super("Nao ha usuario logado");
    }
}
