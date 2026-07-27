package org.helpDesk.domain.user.dto.res;

import java.util.UUID;

public record ResListUserByProfileDTO(
        UUID id,
        String name,
        String email
) {}
