import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Attachment } from '../../../models/attachment/attachment';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private http = inject(HttpClient)
  private back = `${environment.apiUrl}/attachments`

  upload(ticketId: string, files: FormData){
    return this.http.post(`${this.back}/ticketId/${ticketId}` , files)
  }

  download(id: string){
    return this.http.get(`${this.back}/id/${id}/download`, {responseType: 'blob'})
  }

  list(ticketId: string):Observable<Attachment[]>{
    return this.http.get<Attachment[]>(`${this.back}/ticketId/${ticketId}`)
  }

  delete(id: string){
    return this.http.delete(`${this.back}/id/${id}`)
  }
}
