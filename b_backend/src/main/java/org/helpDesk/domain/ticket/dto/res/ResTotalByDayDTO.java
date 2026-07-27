package org.helpDesk.domain.ticket.dto.res;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ResTotalByDayDTO(
        @JsonFormat(pattern = "dd/MM")
        LocalDateTime day,
        Long total
) {}
