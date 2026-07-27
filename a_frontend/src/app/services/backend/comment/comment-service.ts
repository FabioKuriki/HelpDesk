import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResListCommentDTO } from '../../../models/comment/res/res-list-comment-dto';
import { ReqCreateCommentDTO } from '../../../models/comment/req/req-create-comment-dto';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient)
  private back = `${environment.apiUrl}/comments`

  createComment(dto: ReqCreateCommentDTO){
    return this.http.post(`${this.back}`, dto, {withCredentials: true})
  }

  listCommentsByTicketId(ticketId: string):Observable<ResListCommentDTO[]>{
    return this.http.get<ResListCommentDTO[]>(`${this.back}/list/${ticketId}`)
  }
}
