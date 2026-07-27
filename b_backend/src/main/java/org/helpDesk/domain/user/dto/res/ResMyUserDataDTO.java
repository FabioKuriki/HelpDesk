package org.helpDesk.domain.user.dto.res;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.helpDesk.domain.user.enums.UserProfile;

import java.time.LocalDate;

public record ResMyUserDataDTO(
        String name,
        String email,
        String password,
        UserProfile profile,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate createdAt
) {}
