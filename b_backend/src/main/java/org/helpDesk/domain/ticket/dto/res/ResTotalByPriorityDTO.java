package org.helpDesk.domain.ticket.dto.res;

import org.helpDesk.domain.ticket.enums.TicketPriority;

public record ResTotalByPriorityDTO(
    TicketPriority priority,
    Long total
){}
