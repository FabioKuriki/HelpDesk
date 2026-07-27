import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { Button } from "../../../../components/button/button";
import { Card } from "../../../../components/card/card";
import { Table } from "../../../../components/table/table";
import { TicketService } from '../../../../services/backend/ticket/ticket-service';
import { ResTicketListCreatedDTO } from '../../../../models/ticket/res/res-ticket-list-created-dto';
import { ListFilter } from "../../../../components/list-filter/list-filter";
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTicket } from '../../../../components/dialogs/dialog-add-ticket/dialog-add-ticket';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { DialogService } from '../../../../services/dialog/dialog-service';

@Component({
  selector: 'app-page-tickets',
  imports: [Button, Card, Table, ListFilter, MatTabsModule],
  templateUrl: './page-tickets.html',
  styleUrl: './page-tickets.css',
})
export class Tickets {
  private ticketService = inject(TicketService)
  private dialogService = inject(DialogService)
  private cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialogService.openDialog(DialogAddTicket, '2500px', '0ms', '0ms')
  }

  columnsAvailable = [
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
  ];

  columnsResponsible = [
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

  columnsClosed = [
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
      columnDef: 'responsible',
      header: 'Responsável',
      cell: (element: any) => `${element.responsible}`,
    },
    {
      columnDef: 'closedAt',
      header: 'Fechado',
      cell: (element: any) => `${element.closedAt}`,
    },
  ];

  ngOnInit(){
    this.getMyResponsibleTickets();
    this.useListTickets();
    this.useListTicketsClosed();
  }

  myTickets: any = []
  myTicketsDataSource!: MatTableDataSource<ResTicketListCreatedDTO>;

  getMyResponsibleTickets(){
    this.ticketService.getMyRequesterOrResponsibleTickets("responsible")
    .subscribe({
      next: (res) => {
        this.myTickets = res,
        this.myTicketsDataSource = new MatTableDataSource(this.myTickets),
        this.checkDataSourcesLoaded()
      },
      error: (err) => console.log(err),
    })
  }

  tickets: any = []
  ticketsDataSource!: MatTableDataSource<ResTicketListCreatedDTO>;

  useListTickets(){
    this.ticketService.listTickets()
    .subscribe({
      next: (res) => {
        this.tickets = res,
        this.ticketsDataSource = new MatTableDataSource(this.tickets),
        this.checkDataSourcesLoaded()
      },
      error: (err) => console.log(err),
    })
  }

  ticketsClosed: any = []
  ticketsClosedDataSource!: MatTableDataSource<ResTicketListCreatedDTO>;

  useListTicketsClosed(){
    this.ticketService.listTicketsClosed()
    .subscribe({
      next: (res) => {
        this.ticketsClosed = res
        this.ticketsClosedDataSource = new MatTableDataSource(this.ticketsClosed),
        this.checkDataSourcesLoaded()
      }
    })
  }

  dataSources: MatTableDataSource<any>[] = [];

  currentDataSource!: MatTableDataSource<any>;

  onTabChange(event: MatTabChangeEvent) {
    this.currentDataSource = this.dataSources[event.index];
  }

  private setDataSources() {
    this.dataSources = [
      this.ticketsDataSource,
      this.myTicketsDataSource,
      this.ticketsClosedDataSource
    ];

    this.currentDataSource = this.dataSources[0];
  }

  private checkDataSourcesLoaded() {
    if (
      this.myTicketsDataSource &&
      this.ticketsDataSource &&
      this.ticketsClosedDataSource
    ) {
      this.setDataSources();
      this.cdr.markForCheck();
    }
  }
}
