package org.helpDesk.domain.user.dto.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.helpDesk.domain.user.enums.UserProfile;

public record ReqSignUpUserDTO(
        @NotBlank(message = "name is required")
        @Size(min = 2, max = 120, message = "name must be between 2 and 120 characters")
        String name,
        @NotBlank(message = "email is required")
        @Email(message = "email must be valid")
        String email,
        @NotBlank(message = "password is required")
        @Size(min = 6, max = 120, message = "password must be between 6 and 120 characters")
        String password,
        @NotBlank(message = "profile is required")
        @Size(min = 6, max = 120, message = "profile must be between 6 and 120 characters")
        UserProfile profile
) {}
