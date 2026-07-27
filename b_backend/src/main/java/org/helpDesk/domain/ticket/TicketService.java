package org.helpDesk.domain.ticket;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import org.helpDesk.domain.ticket.dto.req.ReqCreateTicketDTO;
import org.helpDesk.domain.ticket.dto.res.*;
import org.helpDesk.domain.ticket.enums.TicketPriority;
import org.helpDesk.domain.ticket.enums.TicketStatus;
import org.helpDesk.domain.user.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class TicketService {
    @Inject private EntityManager em;
    @Inject private TicketMapper ticketMapper;
    @Inject private UserService userService;

    @Transactional
    public void createTicket(ReqCreateTicketDTO dto){
        UUID userId = userService.validateLoggedUser();

        Ticket ticket = ticketMapper.toEntity(dto);
        ticket.setRequester(userService.getUserById(userId));
        em.persist(ticket);
    }

    @Transactional
    public void takeTicket(UUID ticketId){
        Ticket ticket = findById(ticketId);

        if(ticket.getStatus() != TicketStatus.ABERTO){
            throw new BadRequestException("Ticket status is not ABERTO");
        }

        if(ticket.getResponsible() != null){
            throw new BadRequestException("Ticket responsible already exists");
        }

        ticket.setStatus(TicketStatus.EM_ANDAMENTO);
        ticket.setResponsible(userService.getMyData());
    }

    @Transactional
    public void updateTicketUpdatedAt(UUID ticketId) {
        Ticket ticket = findById(ticketId);
        ticket.setUpdatedAt(LocalDateTime.now());
    }

    @Transactional
    public void closeTicket(UUID ticketId) {
        Ticket ticket = findById(ticketId);

        if(ticket.getResponsible() != userService.getMyData()){
            throw new BadRequestException("Ticket responsible invalid");
        }

        ticket.setStatus(TicketStatus.RESOLVIDO);
        ticket.setClosedAt(LocalDateTime.now());
    }

    public ResTicketByIdDTO findByIdDto(UUID ticketId){
        return ticketMapper.toResTicketByIdDTO(findById(ticketId));
    }

    public Ticket findById(UUID ticketId){
        Ticket ticket =  em.find(Ticket.class, ticketId);

        if(ticket == null){
            throw new NotFoundException("Ticket não encontrado");
        }

        return ticket;
    }

    public List<ResTicketListCreatedDTO> listTicketsWithoutResponsible(){
        return ticketMapper.toResTicketListCreatedDTO(
                em.createQuery("SELECT t FROM ticket t WHERE t.responsible.id IS NULL " +
                                "AND t.status = 'ABERTO' ORDER BY t.createdAt ASC", Ticket.class)
                        .getResultList()
        );
    }

    public List<ResTicketListDTO> listMyRequesterTickets(){
        return ticketMapper.toResTicketListDTO(
                listRequesterTickets(userService.validateLoggedUser())
        );
    }

    public List<ResTicketListDTO> listMyResponsibleTickets(){
        return ticketMapper.toResTicketListDTO(
                listResponsibleTickets(userService.validateLoggedUser())
        );
    }

    public List<ResTicketListClosedDTO> listTicketsClosed(){
        return ticketMapper.toResTicketListClosedDTO(
                em.createQuery("SELECT t FROM ticket t WHERE " +
                                "t.status = 'RESOLVIDO' OR t.status = 'CANCELADO' " +
                                "ORDER BY t.createdAt DESC", Ticket.class)
                        .getResultList()
        );
    }

    public List<Ticket> listRequesterTickets(UUID userId){
        return em.createQuery("SELECT t FROM ticket t WHERE t.requester.id = :userId " +
                        "ORDER BY t.createdAt DESC",Ticket.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    public List<Ticket> listResponsibleTickets(UUID userId){
        return em.createQuery("SELECT t FROM ticket t WHERE t.responsible.id = :userId AND " +
                        "t.status = 'EM_ANDAMENTO' ORDER BY t.createdAt ASC", Ticket.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    public Long countByStatus(TicketStatus status){
        return em.createQuery("SELECT COUNT(t) FROM ticket t WHERE t.status = :status ", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }

    public Long countMyByStatus(TicketStatus status, String requesterOrResponsible){
        return em.createQuery("SELECT COUNT(t) FROM ticket t WHERE t.status = :status " +
                        "AND t." + requesterOrResponsible + ".id = :uuid ", Long.class)
                .setParameter("status", status)
                .setParameter("uuid", userService.validateLoggedUser())
                .getSingleResult();
    }

    public Long countMyByPriority(TicketPriority priority, String requesterOrResponsible){
        return em.createQuery("SELECT COUNT(t) FROM ticket t WHERE t.priority = :priority " +
                "AND t." + requesterOrResponsible + ".id = :uuid ", Long.class)
                .setParameter("priority", priority)
                .setParameter("uuid", userService.validateLoggedUser())
                .getSingleResult();
    }

    public Long countByPriority(TicketPriority priority){
        return em.createQuery("SELECT COUNT(t) FROM ticket t WHERE t.priority = :priority ", Long.class)
                .setParameter("priority", priority)
                .getSingleResult();
    }

    public List<ResTotalByStatusDTO> getKpiTotalStatus(){
        List<TicketStatus> statusList = List.of(
                TicketStatus.ABERTO, TicketStatus.EM_ANDAMENTO, TicketStatus.RESOLVIDO);
        List<ResTotalByStatusDTO> finalList = new ArrayList<>();

        statusList.forEach(
                ticketStatus -> finalList.add(
                        new ResTotalByStatusDTO(
                                ticketStatus,
                                countMyByStatus(ticketStatus, "responsible")
                        )
                )
        );

        return finalList;
    }

    public List<ResTotalByPriorityDTO> getKpiTotalPriority(){
        List<TicketPriority> statusList = List.of(TicketPriority.values());
        List<ResTotalByPriorityDTO> finalList = new ArrayList<>();

        statusList.forEach(
                ticketPriority -> finalList.add(
                        new ResTotalByPriorityDTO(
                                ticketPriority,
                                countMyByPriority(ticketPriority, "responsible")
                        )
                )
        );

        return finalList;
    }

    public Long getMeTotalClosedLastDays(String requesterOrResponsible, LocalDateTime day){
        return em.createQuery("SELECT COUNT(t) FROM ticket t WHERE t." + requesterOrResponsible + ".id = :userId " +
                        "AND t.closedAt >= :start AND t.closedAt < :end", Long.class)
                .setParameter("userId", userService.validateLoggedUser())
                .setParameter("start", day.toLocalDate().atStartOfDay())
                .setParameter("end", day.toLocalDate().plusDays(1).atStartOfDay())
                .getSingleResult();
    }


    public List<ResTotalByDayDTO> getKpiTotalDays(Integer numberDays){
        LocalDateTime now = LocalDateTime.now();
        List<ResTotalByDayDTO> finalList = new ArrayList<>();
        int daysToRemove = numberDays;

        for (int i = 0; i < numberDays; i++) {
            finalList.add(new ResTotalByDayDTO(
                    now.minusDays(daysToRemove),
                    getMeTotalClosedLastDays("responsible", now.minusDays(daysToRemove))
            ));
            daysToRemove--;
        }

        return finalList;
    }
}
