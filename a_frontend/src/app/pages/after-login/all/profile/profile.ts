import { Component, inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Card } from "../../../../components/card/card";
import { UserService } from '../../../../services/backend/user/user-service';
import { TicketService } from '../../../../services/backend/ticket/ticket-service';
import { ResTicketListCreatedDTO } from '../../../../models/ticket/res/res-ticket-list-created-dto';
import { Table } from "../../../../components/table/table";
import { ListFilter } from "../../../../components/list-filter/list-filter";
import { Kpi } from "../../../../components/kpi/kpi";
import { Button } from "../../../../components/button/button";
import { DialogEditUser } from '../../../../components/dialogs/dialog-edit-user/dialog-edit-user';
import { AlertService } from '../../../../services/alert/alert-service';
import { DialogService } from '../../../../services/dialog/dialog-service';
import { DialogAddTicket } from '../../../../components/dialogs/dialog-add-ticket/dialog-add-ticket';


@Component({
  selector: 'app-profile',
  imports: [Card, Table, ListFilter, Kpi, Button],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile{
  private userService = inject(UserService);
  private ticketService = inject(TicketService);
  private alertService = inject(AlertService)
  private dialogService = inject(DialogService)
  private cdr = inject(ChangeDetectorRef);
  public user: any = "";
  readonly dialog = inject(MatDialog);

  columnsRequester = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: any) => `${element.id}`,
    },
    {
      columnDef: 'priority',
      header: 'Prioridade',
      cell: (element: any) => `${element.priority}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: any) => `${element.status}`,
    },
    {
      columnDef: 'title',
      header: 'Titulo',
      cell: (element: any) => `${element.title}`,
    },
    {
      columnDef: 'description',
      header: 'Descrição',
      cell: (element: any) => `${element.description}`,
    },
    {
      columnDef: 'createdAt',
      header: 'Criado',
      cell: (element: any) => `${element.createdAt}`,
    },
    {
      columnDef: 'updatedAt',
      header: 'Ultima modificação',
      cell: (element: any) => `${element.updatedAt}`,
    },
  ];
  
  ngOnInit() {
    this.getMyLoggedUserData();
    this.getCountAllOpenTickets();
    this.getCountAllRunningTickets();
    this.getCountAllSolvedTickets();
    this.getMyRequesterTickets();
  }

  async removeAccount() {

    const RESULT = await this.alertService.confirm(
      'Deseja realmente excluir sua conta?'
    );

    if (RESULT.isConfirmed) {
      this.useDeleteUser()
      await this.alertService.success('Conta excluída com sucesso.');
    }
  }

  useDeleteUser(){
    this.userService.deleteUser()
    .subscribe({
      next: (res) => this.userService.logout()
    })
  }

  openDialogEditUser(): void {
    this.dialogService.openDialog(DialogEditUser, '2500px', '0ms', '0ms')
  }

  openDialogAddTicket(): void {
      this.dialogService.openDialog(DialogAddTicket, '2500px', '0ms', '0ms')
    }
  
  tickets: any = []
  dataSource!: MatTableDataSource<ResTicketListCreatedDTO>;

  getMyRequesterTickets(){
    this.ticketService.getMyRequesterOrResponsibleTickets("requester")
    .subscribe({
      next: (res) => {
        this.tickets = res,
        this.dataSource = new MatTableDataSource(this.tickets),
        this.cdr.markForCheck()
      },
      error: (err) => console.log(err),
    })
  }


  getMyLoggedUserData(){
    this.userService.LoggedUserdata().subscribe({
      next: (res) => {
        this.user = res
        this.cdr.markForCheck()
      },
      error: (err) => console.log(err),
    });
  }

  countOpenTickets: any = 0;

  getCountAllOpenTickets(){
    return this.ticketService.countMeAllStatusTickets("requester", "ABERTO")
    .subscribe(
      (res) => {
        this.countOpenTickets = res
        this.cdr.markForCheck()
      }
    )
  }

  countRunningTickets: any = 0;

  getCountAllRunningTickets(){
    return this.ticketService.countMeAllStatusTickets("requester", "EM_ANDAMENTO")
    .subscribe(
      (res) => {
        this.countRunningTickets = res
        this.cdr.markForCheck()
      }
    )
  }

  countSolvedTickets: any = 0;

  getCountAllSolvedTickets(){
    return this.ticketService.countMeAllStatusTickets("requester", "RESOLVIDO")
    .subscribe(
      (res) => {
        this.countSolvedTickets = res
        this.cdr.markForCheck()
      }
    )
  }
}
