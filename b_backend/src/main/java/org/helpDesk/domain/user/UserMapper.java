package org.helpDesk.domain.user;

import org.helpDesk.domain.user.dto.req.ReqSignUpUserDTO;
import org.helpDesk.domain.user.dto.res.ResListUserByProfileDTO;
import org.helpDesk.domain.user.dto.res.ResMyUserDataDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toEntity(ReqSignUpUserDTO dto);
    ReqSignUpUserDTO toResSignUpDTO(User user);

    ResListUserByProfileDTO toResNameEmailDTO(User user);
    List<ResListUserByProfileDTO> toResNameEmailDTO(List<User> users);

    ResMyUserDataDTO toResMyUserDataDTO(User user);
}
