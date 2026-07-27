package org.helpDesk.domain.comment;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.helpDesk.domain.comment.dto.req.ReqCreateCommentDTO;

import java.util.UUID;

@Path("/comments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CommentController {
    @Inject CommentService commentService;

    @POST
    @Transactional
    public Response createComment(ReqCreateCommentDTO dto){
        commentService.createComment(dto);
        return Response.ok().build();
    }

    @GET
    @Path("/list/{ticketId}")
    public Response listComments(@PathParam("ticketId") UUID ticketId){
        return Response.ok(commentService.listCommentsByTicketId(ticketId)).build();
    }
}
