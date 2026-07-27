package org.helpDesk.domain.ticket.dto.res;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.helpDesk.domain.ticket.enums.TicketPriority;
import org.helpDesk.domain.ticket.enums.TicketStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record ResTicketListCreatedDTO(
    UUID id,
    String title,
    String description,
    TicketStatus status,
    TicketPriority priority,
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    LocalDateTime createdAt
) {}
