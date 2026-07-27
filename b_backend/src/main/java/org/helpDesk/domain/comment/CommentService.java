package org.helpDesk.domain.comment;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import org.helpDesk.domain.comment.dto.req.ReqCreateCommentDTO;
import org.helpDesk.domain.comment.dto.res.ResListCommentDTO;
import org.helpDesk.domain.ticket.TicketService;
import org.helpDesk.domain.user.UserService;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class CommentService {
    @Inject private EntityManager em;
    @Inject private CommentMapper commentMapper;
    @Inject private UserService userService;
    @Inject private TicketService ticketService;

    public void createComment(ReqCreateCommentDTO dto){
        Comment entity = commentMapper.toEntity(dto);
        entity.setAuthor(userService.getUserById(userService.validateLoggedUser()));
        em.persist(entity);
        ticketService.updateTicketUpdatedAt(dto.ticket());
    }

    public List<ResListCommentDTO> listCommentsByTicketId(UUID ticketId){
        return commentMapper.toResListCommentDTO(
                em.createQuery("SELECT c FROM comment c WHERE c.ticket.id = :ticketId", Comment.class)
                        .setParameter("ticketId", ticketId)
                        .getResultList()
        );
    }
}
