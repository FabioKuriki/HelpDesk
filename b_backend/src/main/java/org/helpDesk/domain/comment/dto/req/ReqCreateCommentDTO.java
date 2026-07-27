package org.helpDesk.domain.comment.dto.req;

import java.util.UUID;

public record ReqCreateCommentDTO (
        UUID ticket,
        String text
){}
