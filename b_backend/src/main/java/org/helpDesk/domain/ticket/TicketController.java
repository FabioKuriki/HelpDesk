package org.helpDesk.domain.ticket;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.helpDesk.domain.ticket.dto.req.ReqCreateTicketDTO;
import org.helpDesk.domain.ticket.enums.TicketCategory;
import org.helpDesk.domain.ticket.enums.TicketPriority;
import org.helpDesk.domain.ticket.enums.TicketStatus;

import java.util.UUID;

@Tag(name = "Ticket")
@Path("/tickets")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TicketController {
    @Inject private TicketService ticketService;

    @POST
    public Response createTicket(ReqCreateTicketDTO dto){
        ticketService.createTicket(dto);
        return Response.ok().build();
    }

    @GET
    @Path("/id/{id}/take")
    public Response takeTicket(@PathParam("id") UUID id){
        ticketService.takeTicket(id);
        return Response.ok().build();
    }

    @GET
    @Path("/id/{id}")
    public Response getTicketById(@PathParam("id") UUID id){
        return Response.ok(ticketService.findByIdDto(id)).build();
    }

    @GET
    @Path("/id/{id}/close")
    public Response closeTicket(@PathParam("id") UUID id){
        ticketService.closeTicket(id);
        return Response.ok().build();
    }

    @GET
    public Response listTicketsWithoutResponsible(){
        return Response.ok(ticketService.listTicketsWithoutResponsible()).build();
    }

    @GET
    @Path("/me/requester")
    public Response listMyRequesterTickets(){
        return Response.ok(ticketService.listMyRequesterTickets()).build();
    }

    @GET
    @Path("/me/responsible")
    public Response listMyResponsibleTickets(){
        return Response.ok(ticketService.listMyResponsibleTickets()).build();
    }

    @GET
    @Path("/closed")
    public Response listTicketsClosed(){
        return Response.ok(ticketService.listTicketsClosed()).build();
    }

    @GET
    @Path("/status/{ticketStatus}")
    public Response countByStatus(@PathParam("ticketStatus") TicketStatus ticketStatus){
        return Response.ok(ticketService.countByStatus(ticketStatus)).build();
    }

    @GET
    @Path("me/{requesterOrResponsible}/status/{ticketStatus}")
    public Response countByStatus(@PathParam("requesterOrResponsible") String requesterOrResponsible,
                                  @PathParam("ticketStatus") TicketStatus ticketStatus){
        return Response.ok(ticketService.countMyByStatus(ticketStatus, requesterOrResponsible)).build();
    }

    @GET
    @Path("me/{requesterOrResponsible}/priority/{ticketPriority}")
    public Response countByPriority(@PathParam("requesterOrResponsible") String requesterOrResponsible,
                                    @PathParam("ticketPriority") TicketPriority ticketPriority){
        return Response.ok(ticketService.countMyByPriority(ticketPriority, requesterOrResponsible)).build();
    }

    @GET
    @Path("/priority/{ticketPriority}")
    public Response countByPriority(@PathParam("ticketPriority") TicketPriority ticketPriority){
        return Response.ok(ticketService.countByPriority(ticketPriority)).build();
    }

    @GET
    @Path("/me/kpi/total-status")
    public Response countByKpiTotalStatus(){
        return Response.ok(ticketService.getKpiTotalStatus()).build();
    }

    @GET
    @Path("/me/kpi/total-priority")
    public Response countByKpiTotalPriority(){
        return Response.ok(ticketService.getKpiTotalPriority()).build();
    }

    @GET
    @Path("/me/kpi/total-last-days/{days}")
    public Response getKpiTotalDays(@PathParam("days") Integer days){
        return Response.ok(ticketService.getKpiTotalDays(days)).build();
    }

    @GET
    @Path("/priority")
    public Response listPriorities(){
        return Response.ok(TicketPriority.values()).build();
    }

    @GET
    @Path("/category")
    public Response listCategories(){
        return Response.ok(TicketCategory.values()).build();
    }
}
