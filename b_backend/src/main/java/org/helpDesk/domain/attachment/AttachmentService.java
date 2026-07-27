package org.helpDesk.domain.attachment;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import org.helpDesk.domain.attachment.dto.res.ResAttachmentDownloadDTO;
import org.helpDesk.domain.ticket.Ticket;
import org.helpDesk.domain.ticket.TicketService;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class AttachmentService {
    @Inject EntityManager em;
    @Inject TicketService ticketService;

    private static final String UPLOAD_DIR = "uploads";

    @Transactional
    public List<Attachment> upload(UUID ticketId, List<FileUpload> files) {
        Ticket ticket = ticketService.findById(ticketId);
        List<Attachment> attachments = new ArrayList<>();

        for (FileUpload file : files) {
            attachments.add(upload(ticket, file));
        }

        return attachments;
    }

    @Transactional
    public Attachment upload(Ticket ticket, FileUpload file) {

        if (file == null) {
            throw new BadRequestException("Arquivo obrigatório");
        }

        String storedFileName = UUID.randomUUID()
                + "-"
                + file.fileName();

        Path directory = Paths.get(UPLOAD_DIR);

        try {
            Files.createDirectories(directory);

            Path destination = directory.resolve(storedFileName);

            Files.copy(
                    file.uploadedFile(),
                    destination,
                    StandardCopyOption.REPLACE_EXISTING
            );

            Attachment attachment = new Attachment();

            attachment.setFileName(file.fileName());
            attachment.setContentType(file.contentType());
            attachment.setFileSize(file.size());
            attachment.setFilePath(destination.toString());
            attachment.setTicket(ticket);

            em.persist(attachment);

            return attachment;

        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivo", e);
        }
    }

    public List<Attachment> findAllByTicketId(UUID ticketId) {
        return em.createQuery("SELECT a FROM attachment a WHERE a.ticket.id = :ticketId", Attachment.class)
                .setParameter("ticketId", ticketId)
                .getResultList();
    }

    public Attachment findById(UUID id) {
        return em.find(Attachment.class, id);
    }

    public ResAttachmentDownloadDTO download(UUID attachmentId) {

        Attachment attachment = findById(attachmentId);

        if (attachment == null) {
            throw new NotFoundException("Anexo não encontrado");
        }

        Path path = Paths.get(attachment.getFilePath());

        if (!Files.exists(path)) {
            throw new NotFoundException("Arquivo não encontrado");
        }

        return new ResAttachmentDownloadDTO(
                path,
                attachment.getFileName(),
                attachment.getContentType()
        );
    }

    @Transactional
    public void delete(UUID attachmentId) {

        Attachment attachment = findById(attachmentId);

        if (attachment == null) {
            throw new NotFoundException("Anexo não encontrado");
        }

        try {
            Files.deleteIfExists(Paths.get(attachment.getFilePath()));
        } catch (IOException e) {
            throw new RuntimeException("Erro ao remover arquivo", e);
        }

        em.remove(attachment);
    }
}