package org.helpDesk.domain.comment;

import jakarta.persistence.*;
import org.helpDesk.domain.ticket.Ticket;
import org.helpDesk.domain.user.User;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "comment")
public class Comment {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private LocalDateTime createdAt =  LocalDateTime.now();

    public Comment() {
    }

    public Comment(UUID id, Ticket ticket, User author, String text, LocalDateTime createdAt) {
        this.id = id;
        this.ticket = ticket;
        this.author = author;
        this.text = text;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
