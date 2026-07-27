package org.helpDesk.domain.user;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.helpDesk.shared.jwt.JwtService;
import org.helpDesk.domain.user.dto.req.ReqEditUserDTO;
import org.helpDesk.domain.user.dto.req.ReqLoginUserDTO;
import org.helpDesk.domain.user.dto.req.ReqSignUpUserDTO;
import org.helpDesk.domain.user.enums.UserProfile;
import java.util.UUID;

@Tag(name = "User")
@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserController {
    @Inject private UserService userService;
    @Inject private JwtService jwtService;

    @GET
    @Path("/{id}")
    public Response listUserById(@PathParam("id") UUID id) {
        return Response.ok(userService.getUserById(id)).build();
    }

    @GET
    @Path("/me")
    public Response getLoginData(){
        return Response.ok(userService.getMyDataDto()).build();
    }

    @GET
    @Path("/profile")
    public Response getMyProfile(){
        return Response.ok(userService.getMyProfile()).build();
    }

    @GET
    public Response listUsers() {
        return Response.ok(userService.listUsers()).build();
    }

    @GET()
    @Path("/profile/{profile}")
    public Response listUsersByProfile(@PathParam("profile") UserProfile profile) {
        return Response.ok(userService.listUsersByProfile(profile)).build();
    }

    @GET
    @Path("/logout")
    public Response logout(){
        return jwtService.removeCookie();
    }

    @GET
    @Path("/count-all")
    public Response countAllUsers(){
        return Response.ok(userService.countAllUsers()).build();
    }

    @POST
    @Path("/login")
    public Response login(ReqLoginUserDTO dto){
        User user = userService.login(dto);

        if(user != null && user.isActive()){
            return jwtService.generateCookie(user);
        }

        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("/sign-up")
    public Response signUp(ReqSignUpUserDTO user) {
        userService.singUp(user);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{id}")
    public Response editUser(@PathParam("id") UUID id, User user) {
        user.setId(id);
        userService.editUser(user);
        return Response.ok().build();
    }

    @PUT
    @Path("/me")
    public Response editMyUser(ReqEditUserDTO user) {
        userService.editMyUser(user);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") UUID id) {
        userService.deleteUser(id);
        return Response.noContent().build();
    }

    @DELETE
    @Path("/me")
    public Response deleteMyUser() {
        userService.deleteMyUser();
        return Response.noContent().build();
    }
}
