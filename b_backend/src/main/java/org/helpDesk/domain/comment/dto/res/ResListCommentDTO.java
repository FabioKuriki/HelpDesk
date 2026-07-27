package org.helpDesk.domain.comment.dto.res;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.helpDesk.domain.user.dto.res.ResListUserByProfileDTO;

import java.time.LocalDateTime;

public record ResListCommentDTO(
        ResListUserByProfileDTO author,
        String text,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
        LocalDateTime createdAt
) {}
