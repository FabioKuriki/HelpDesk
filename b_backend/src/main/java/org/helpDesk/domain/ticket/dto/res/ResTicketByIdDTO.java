package org.helpDesk.domain.ticket.dto.res;

import com.aayushatharva.brotli4j.common.annotations.Local;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.helpDesk.domain.ticket.enums.TicketCategory;
import org.helpDesk.domain.ticket.enums.TicketPriority;
import org.helpDesk.domain.ticket.enums.TicketStatus;
import org.helpDesk.domain.user.User;

import java.time.LocalDateTime;
import java.util.UUID;

public record ResTicketByIdDTO(
        UUID id,
        String title,
        String description,
        TicketCategory category,
        User requester,
        User responsible,
        TicketStatus status,
        TicketPriority priority,

        @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
        LocalDateTime createdAt,

        @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
        LocalDateTime updatedAt
) {}
