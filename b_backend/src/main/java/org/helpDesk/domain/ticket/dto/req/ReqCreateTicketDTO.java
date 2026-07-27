package org.helpDesk.domain.ticket.dto.req;

import org.helpDesk.domain.ticket.enums.TicketCategory;
import org.helpDesk.domain.ticket.enums.TicketPriority;

import java.util.UUID;

public record ReqCreateTicketDTO(
        String title,
        String description,
        TicketCategory category,
        TicketPriority priority
) {}
