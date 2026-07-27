package org.helpDesk.domain.ticket;

import org.helpDesk.domain.ticket.dto.req.ReqCreateTicketDTO;
import org.helpDesk.domain.ticket.dto.res.ResTicketByIdDTO;
import org.helpDesk.domain.ticket.dto.res.ResTicketListClosedDTO;
import org.helpDesk.domain.ticket.dto.res.ResTicketListCreatedDTO;
import org.helpDesk.domain.ticket.dto.res.ResTicketListDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface TicketMapper {
    @Mapping(target = "responsible", ignore = true)
    Ticket toEntity(ReqCreateTicketDTO dto);

    ResTicketListCreatedDTO toResTicketListCreatedDTO(Ticket entity);
    List<ResTicketListCreatedDTO> toResTicketListCreatedDTO(List<Ticket> entity);

    ResTicketListDTO toResTicketListDTO(Ticket entity);
    List<ResTicketListDTO> toResTicketListDTO(List<Ticket> entity);

    @Mapping(target = "responsible", source = "responsible.name")
    ResTicketListClosedDTO ResTicketListClosedDTO(Ticket entity);
    List<ResTicketListClosedDTO> toResTicketListClosedDTO(List<Ticket> entity);

    ResTicketByIdDTO toResTicketByIdDTO(Ticket entity);
}
