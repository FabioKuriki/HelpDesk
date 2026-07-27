import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { UserService } from '../../../../services/backend/user/user-service';
import { Kpi } from "../../../../components/kpi/kpi";
import { TicketService } from '../../../../services/backend/ticket/ticket-service';
import { Card } from "../../../../components/card/card";
import { ResTotalByStatusDTO } from '../../../../models/ticket/res/res-total-by-status-dto';
import { ResTotalByPriorityDTO } from '../../../../models/ticket/res/res-total-by-priority-dto';
import { ResTotalByDayDTO } from '../../../../models/ticket/res/res-total-by-day-dto';


@Component({
  selector: 'app-page-dashboard',
  imports: [Kpi, NgApexchartsModule, Card],
  templateUrl: './page-dashboard.html',
  styleUrl: './page-dashboard.css',
})
export class Dashboard {
  private userService = inject(UserService)
  private ticketService = inject(TicketService)
  private cdr = inject(ChangeDetectorRef);
  user: any;

  ngOnInit(){
    this.getLoggedUserdata();
    this.getCountUrgentTickets();
    this.getCountOpenTickets();
    this.getCountRunningTickets();
    this.getCountMeByKpiTotalLastDays(5);
    this.getCountMeByKpiTotalStatus();
    this.getCountMeByKpiTotalPriority();
  }

  getLoggedUserdata(){
    this.userService.LoggedUserdata()
    .subscribe({
      next: (res) => {
        this.user = res,
        this.cdr.markForCheck()
      },
      error: (err) => console.log('erro ao pegar nome: ', err)
    })
  }

  countUrgentTickets: any = 0;

  getCountUrgentTickets(){
    this.ticketService.countMeAllPriorityTickets("responsible", "URGENTE")
    .subscribe({
      next: (res) => {
        this.countUrgentTickets = res,
        this.cdr.markForCheck()
      }
    })
  }

  countOpenTickets: any = 0;

  getCountOpenTickets(){
    this.ticketService.countMeAllStatusTickets("responsible", "ABERTO")
    .subscribe({
      next: (res) => {
        this.countOpenTickets = res,
        this.cdr.markForCheck()
      }
    })
  }

  countRunningTickets: any = 0;

  getCountRunningTickets(){
    this.ticketService.countMeAllStatusTickets("responsible", "EM_ANDAMENTO")
    .subscribe({
      next: (res) => {
        this.countRunningTickets = res,
        this.cdr.markForCheck()
      }
    })
  }

  getCountMeByKpiTotalLastDays(days: Number){
    this.ticketService.countMeByKpiTotalLastDays(days)
    .subscribe({
      next: (res) =>{
        const data = res.map(item => item.total);
        const categories = res.map(item => item.day);

        this.chartArea = {
          ...this.chartArea,
          series: [
            {
              name: 'Total',
              data: data
            }
          ],
          xaxis: {
            categories: categories
          }
        };

        this.cdr.markForCheck()
      }
    })
  }

  getCountMeByKpiTotalStatus(){
    this.ticketService.countMeByKpiTotalStatus()
    .subscribe({
      next: (res) =>{
        const status = res.map(item => item.status);
        const total = res.map(item => item.total);

        this.chartDonut = {
          ...this.chartDonut,
          series: total,
          labels: status
        };

        this.cdr.markForCheck()
      }
    })
  }

  getCountMeByKpiTotalPriority(){
    this.ticketService.countMeByKpiTotalPriority()
    .subscribe({
      next: (res) =>{
        const data = res.map(item => item.total);
        const categories = res.map(item => item.priority);

        this.chartBar = {
          ...this.chartBar,
          series: [
            {
              name: 'Total',
              data: data
            }
          ],
          xaxis: {
            categories: categories
          }
        };

        this.cdr.markForCheck()
      }
    })
  }

  chartArea = {
    title: {
      text: "Resolvidos nos últimos 5 dias",
       style: {
        fontSize: '20px',
        fontWeight: 'bold',
      }
    },
    series: [
      {
        name: "Total",
        data: [0]
      }
    ],
    chart: {
      type: "area" as const,
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          reset: false,
          pan: false,
          zoom: false,
        }
      },
    },
    xaxis: {
      categories: ['Nao carregou']
    },
  }

  chartDonut = {
    title: {
      text: "Resumo",
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
      }
    },
    labels: ['Nao carregou'],
    series: [0],
    chart: {
      type: "donut" as const,
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      }
    },
    plotOptions: { 
      pie: { 
        donut: {
          size: '40%'
        },
        customScale: 0.8,
      }
    },
    legend: {
      show: true,
      position: 'bottom' as const,
      fontSize: '1vw',
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '1.3vw',
        fontWeight: 'bold'
      }
    },
  }
  
  chartBar = {
    title: {
      text: 'Quantidade por Prioridade',
       style: {
        fontSize: '20px',
        fontWeight: 'bold',
      }
    },
    series: [
      {
        name: 'My-series',
        data: [0]
      }
    ],
    xaxis: {
      categories: ['Nao carregou'],
    },
    chart: {
      type: 'bar' as const,
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
  };
  
}
