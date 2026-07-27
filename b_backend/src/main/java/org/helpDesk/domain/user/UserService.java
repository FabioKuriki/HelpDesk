package org.helpDesk.domain.user;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.helpDesk.shared.jwt.JwtService;
import org.helpDesk.domain.user.dto.req.ReqEditUserDTO;
import org.helpDesk.domain.user.dto.req.ReqLoginUserDTO;
import org.helpDesk.domain.user.dto.req.ReqSignUpUserDTO;
import org.helpDesk.domain.user.dto.res.ResListUserByProfileDTO;
import org.helpDesk.domain.user.dto.res.ResMyUserDataDTO;
import org.helpDesk.domain.user.enums.UserProfile;
import org.helpDesk.domain.user.exception.UserNotFoundException;
import org.helpDesk.domain.user.exception.UserNotLoggedInException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class UserService {
    @Inject private EntityManager em;
    @Inject private UserMapper userMapper;
    @Inject private JwtService jwtService;

    public User login(ReqLoginUserDTO dto){
        return em.createQuery(
                        "SELECT u FROM usuario u WHERE u.email = :email " +
                                "AND u.password = :password", User.class)
                .setParameter("email", dto.email())
                .setParameter("password", dto.password())
                .getSingleResult();
    }

    @Transactional
    public void singUp(ReqSignUpUserDTO user) {
        em.persist(userMapper.toEntity(user));
    }

    public UUID validateLoggedUser(){
        JsonWebToken jwt = jwtService.getCookieValue();

        if(jwt == null){
            throw new UserNotLoggedInException();
        }

        validateUser(UUID.fromString(jwt.getSubject()));

        return UUID.fromString(jwt.getSubject());
    }

    public void validateUser(UUID userId){
        Long userIdFound = em.createQuery("SELECT COUNT(u) FROM usuario u WHERE u.id = :userId", Long.class)
                .setParameter("userId", userId)
                .getSingleResult();

        if(userIdFound <= 0){
            throw new UserNotFoundException(userId);
        }
    }

    public User getMyData() {
        return getUserById(validateLoggedUser());
    }

    public UserProfile getMyProfile() {
        return getUserProfileById(validateLoggedUser());
    }

    public ResMyUserDataDTO getMyDataDto() {
        return userMapper.toResMyUserDataDTO(getMyData());
    }

    public User getUserById(UUID id) {
        User user = em.find(User.class, id);

        if(user == null){
            throw new UserNotFoundException(id);
        }

        return user;
    }

    public UserProfile getUserProfileById(UUID id){
        return getUserById(id).getProfile();
    }

    public List<ResListUserByProfileDTO> listUsersByProfile(UserProfile profile) {
        return userMapper.toResNameEmailDTO(
                em.createQuery("SELECT u FROM usuario u WHERE u.profile = :profile", User.class)
                .setParameter("profile", profile)
                .getResultList()
        );
    }

    public List<User> listUsers() {
        return em.createQuery("SELECT u FROM usuario u", User.class)
                .getResultList();
    }

    public void editMyUser(ReqEditUserDTO user) {
        User userEntity = getUserById(validateLoggedUser());

        userEntity.setName(user.name());
        userEntity.setEmail(user.email());
        userEntity.setPassword(user.password());

        em.merge(userEntity);
    }

    public void editUser(User user) {
        em.merge(user);
    }

    public void deleteMyUser() {
        deleteUser(validateLoggedUser());
    }

    public void deleteUser(UUID id) {
        em.createQuery("UPDATE usuario u SET u.active = false WHERE u.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    public Long countAllUsers() {
        return em.createQuery("SELECT COUNT(u) FROM usuario u", Long.class).getSingleResult();
    }
}
