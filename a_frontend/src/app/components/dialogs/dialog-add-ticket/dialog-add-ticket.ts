import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { InputBar } from '../../inputs/input-bar/input-bar';
import { InputTextArea } from "../../inputs/input-text-area/input-text-area";
import { InputSelect } from "../../inputs/input-select/input-select";
import { DialogTemplate } from "../_dialog-template/dialog-template";
import { TicketService } from '../../../services/backend/ticket/ticket-service';
import { ResListUserByProfileDTO } from '../../../models/user/res/res-list-user-byProfile-dto';
import { ReqCreateTicketDTO } from '../../../models/ticket/req/req-create-ticket-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/user/user';


@Component({
  selector: 'app-dialog-add-ticket',
  imports: [MatButtonModule, MatDialogClose, InputBar, InputTextArea, InputSelect, DialogTemplate, ReactiveFormsModule],
  templateUrl: './dialog-add-ticket.html',
  styleUrl: './dialog-add-ticket.css',
})
export class DialogAddTicket {
  private ticketService = inject(TicketService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(){
    this.getListCategories();
    this.getListPriorities();
  }

  users: ResListUserByProfileDTO[] = []

  priorities:any = []

  getListPriorities(){
    this.ticketService.listPriorities()
    .subscribe({
      next: (res) => this.priorities = res
    })
  }

  categories:any = []

  getListCategories(){
    this.ticketService.listCategories()
    .subscribe({
      next: (res) => this.categories = res
    })
  }

  user!: User

  createTicketForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true }),
  })


  useCreateTicket(dto: ReqCreateTicketDTO){
    console.log("dto enviado:" + dto)
    this.ticketService.createTicket(dto)
    .subscribe()
  }
}
