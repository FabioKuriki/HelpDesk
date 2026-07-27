package org.helpDesk.domain.ticket.dto.res;

import org.helpDesk.domain.ticket.enums.TicketStatus;

public record ResTotalByStatusDTO(
    TicketStatus status,
    Long total
){}
