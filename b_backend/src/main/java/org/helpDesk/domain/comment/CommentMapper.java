package org.helpDesk.domain.comment;

import org.helpDesk.domain.comment.dto.req.ReqCreateCommentDTO;
import org.helpDesk.domain.comment.dto.res.ResListCommentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface CommentMapper {
    @Mapping(target = "ticket.id", source = "ticket")
    Comment toEntity(ReqCreateCommentDTO dto);

    ResListCommentDTO toResListCommentDTO(Comment comment);
    List<ResListCommentDTO> toResListCommentDTO(List<Comment> comments);
}
