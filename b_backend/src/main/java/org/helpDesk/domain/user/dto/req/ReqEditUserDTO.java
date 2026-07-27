package org.helpDesk.domain.user.dto.req;

public record ReqEditUserDTO (
        String name,
        String email,
        String password
){}
