import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ResTotalByStatusDTO } from '../../../models/ticket/res/res-total-by-status-dto';
import { ResTotalByPriorityDTO } from '../../../models/ticket/res/res-total-by-priority-dto';
import { ResTotalByDayDTO } from '../../../models/ticket/res/res-total-by-day-dto';
import { ReqCreateTicketDTO } from '../../../models/ticket/req/req-create-ticket-dto';
import { Ticket } from '../../../models/ticket/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient)
  private back = `${environment.apiUrl}/tickets`

  listTicketsClosed(){
    return this.http.get(`${this.back}/closed`)
  }

  closeTicket(id: string){
    return this.http.get(`${this.back}/id/${id}/close`, {withCredentials: true})
  }

  takeTicket(id: string){
    return this.http.get(`${this.back}/id/${id}/take`, {withCredentials: true})
  }

  getTicketById(id: string):Observable<Ticket>{
    return this.http.get<Ticket>(`${this.back}/id/${id}`)
  }

  createTicket(dto: ReqCreateTicketDTO){
    return this.http.post(`${this.back}`, dto, {withCredentials: true})
  }

  listPriorities(){
    return this.http.get(`${this.back}/priority`)
  }

  listCategories(){
    return this.http.get(`${this.back}/category`)
  }

  countMeByKpiTotalStatus(): Observable<ResTotalByStatusDTO[]>{
    return this.http.get<ResTotalByStatusDTO[]>(`${this.back}/me/kpi/total-status`, {withCredentials: true})
  }

  countMeByKpiTotalPriority(): Observable<ResTotalByPriorityDTO[]>{
    return this.http.get<ResTotalByPriorityDTO[]>(`${this.back}/me/kpi/total-priority`, {withCredentials: true})
  }

  countMeByKpiTotalLastDays(days: Number): Observable<ResTotalByDayDTO[]>{
    return this.http.get<ResTotalByDayDTO[]>(`${this.back}/me/kpi/total-last-days/${days}`, {withCredentials: true})
  }

  getMyRequesterOrResponsibleTickets(requesterOrResponsible: String){
    return this.http.get(`${this.back}/me/${requesterOrResponsible}`, {withCredentials: true})
  }

  listTickets(){
    return this.http.get(`${this.back}`)
  }

  countAllStatusTickets(status: String){
    return this.http.get(`${this.back}/status/${status}`)
  }

  countMeAllStatusTickets(requesterOrResponsible: String, status: String){
    return this.http.get(`${this.back}/me/${requesterOrResponsible}/status/${status}`, {withCredentials: true})
  }

  countMeAllPriorityTickets(requesterOrResponsible: String, priority: String){
    return this.http.get(`${this.back}/me/${requesterOrResponsible}/priority/${priority}`, {withCredentials: true})
  }
}
