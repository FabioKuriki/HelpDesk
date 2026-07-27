package org.helpDesk.domain.attachment;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.helpDesk.domain.attachment.dto.req.ReqAttachmentUploadDTO;
import org.helpDesk.domain.attachment.dto.res.ResAttachmentDownloadDTO;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.UUID;

@Path("/attachments")
@Consumes(MediaType.MULTIPART_FORM_DATA)
public class AttachmentController {
    @Inject AttachmentService attachmentService;

    @POST
    @Path("/ticketId/{ticketId}")
    public Response upload(@PathParam("ticketId") UUID ticketId, ReqAttachmentUploadDTO request) {
        return Response.ok(attachmentService.upload(ticketId, request.files())).build();
    }

    @GET
    @Path("/ticketId/{ticketId}")
    public Response findAll(@PathParam("ticketId" ) UUID ticketId) {
        return Response.ok(attachmentService.findAllByTicketId(ticketId)).build();
    }

    @GET
    @Path("/id/{attachmentId}/download")
    public Response download(@PathParam("attachmentId") UUID attachmentId) throws IOException {
        ResAttachmentDownloadDTO file = attachmentService.download(attachmentId);

        InputStream stream = Files.newInputStream(file.path());

        return Response.ok(stream, file.contentType())
                .header(
                        "Content-Disposition",
                        "inline; filename=\"" + file.fileName() + "\""
                )
                .build();
    }

    @DELETE
    @Path("/id/{attachmentId}")
    public Response delete(@PathParam("attachmentId") UUID attachmentId) {
        attachmentService.delete(attachmentId);
        return Response.noContent().build();
    }
}
