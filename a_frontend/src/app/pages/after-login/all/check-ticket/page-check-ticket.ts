import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Card } from "../../../../components/card/card";
import { InputBar } from "../../../../components/inputs/input-bar/input-bar";
import { Button } from "../../../../components/button/button";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../../../../services/backend/ticket/ticket-service';
import { Ticket } from '../../../../models/ticket/ticket';
import { CommentService } from '../../../../services/backend/comment/comment-service';
import { ResListCommentDTO } from '../../../../models/comment/res/res-list-comment-dto';
import { FormControl, FormGroup } from '@angular/forms';
import { ReqCreateCommentDTO } from '../../../../models/comment/req/req-create-comment-dto';
import { AttachmentUpload } from "../../../../components/attachment-upload/attachment-upload";
import { UserService } from '../../../../services/backend/user/user-service';

@Component({
  selector: 'app-page-check-ticket',
  imports: [Card, MatTabsModule, InputBar, Button, RouterLink, AttachmentUpload],
  templateUrl: './page-check-ticket.html',
  styleUrl: './page-check-ticket.css',
})
export class PageCheckTicket {
  private route = inject(ActivatedRoute)
  private ticketService = inject(TicketService)
  private userService = inject(UserService)
  private commentService = inject(CommentService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(){
    this.useGetTicketById();
    this.useGetMyProfile();
  }

  myProfile!: string

  useGetMyProfile(){
    this.userService.getMyProfile()
    .subscribe({
      next: (res) => this.myProfile = res
    })
  }

  getTicketID(){
    const ID = this.route.snapshot.paramMap.get("id")

    if (!ID) {
      throw new Error('ID do ticket não encontrado');
    }

    return ID;
  }

  commentForm = new FormGroup({
    ticket: new FormControl(this.getTicketID(), {nonNullable: true}),
    text: new FormControl('', {nonNullable: true})
  }) 
  

  useCreateComment(dto: ReqCreateCommentDTO){
    this.commentService.createComment(dto)
    .subscribe({
      next: (res) => {
        this.useGetTicketById();
        this.useListCommentsByTicketId();
        this.commentForm.get('text')?.reset();
      }
    })
  }

  comments: ResListCommentDTO[] = []

  useListCommentsByTicketId(){
    this.commentService.listCommentsByTicketId(this.getTicketID())
    .subscribe({
      next: (res) => {
        this.comments = res;
        this.cdr.markForCheck();
      }
    })
  }

  ticket!: Ticket

  useGetTicketById(){
    this.ticketService.getTicketById(this.getTicketID())
    .subscribe({
      next: (res) => {
        this.ticket = res;
        this.cdr.markForCheck();
        this.useListCommentsByTicketId();
      }
    })
  }

  useTakeTicket(){
    this.ticketService.takeTicket(this.getTicketID())
    .subscribe({
      next: () => this.useGetTicketById()
    })
  }

  useCloseTicket(){
    this.ticketService.closeTicket(this.getTicketID())
    .subscribe({
      next: () => this.useGetTicketById()
    })
  }
}
