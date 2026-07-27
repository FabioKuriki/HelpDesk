import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { ReqUserLoginDTO } from '../../../models/user/req/req-user-login-dto'
import { ReqUserSignUpDTO } from '../../../models/user/req/req-user-signUp-dto'
import { Observable } from 'rxjs';
import { ResListUserByProfileDTO } from '../../../models/user/res/res-list-user-byProfile-dto';
import { ResUserLoggedDataDTO } from '../../../models/user/res/res-user-logged-data-dto';
import { ReqUserEditDTO } from '../../../models/user/req/req-user-edit-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private back = `${environment.apiUrl}/users`

  getMyProfile(): Observable<string>{
    return this.http.get<string>(`${this.back}/profile`, {withCredentials:true})
  }

  deleteUser(){
    return this.http.delete(`${this.back}/me`, {withCredentials:true})
  }

  editUser(dto: ReqUserEditDTO){
    return this.http.put(`${this.back}/me`, dto, {withCredentials: true})
  }

  countAllUsers(){
    return this.http.get(`${this.back}/count-all`)
  }

  logout(){
    this.http.get(`${this.back}/logout`, {
      withCredentials:true
    }).subscribe(
      {
        next: (res) => this.router.navigate(['']),
        error: (err) => console.log('logout falhou: ', err)
      }
    )  
  }
  
  login(user: ReqUserLoginDTO){
    return this.http.post(`${this.back}/login`, user, {
      withCredentials: true
    }) 
  }

  LoggedUserdata(): Observable<ResUserLoggedDataDTO>{
    return this.http.get<ResUserLoggedDataDTO>(`${this.back}/me`,{
      withCredentials: true
    })
  }

  signUp(user: ReqUserSignUpDTO){
    return this.http.post(`${this.back}/sign-up`, user)
  }

  listUsersByProfile(profile: string):Observable<ResListUserByProfileDTO[]>{
    return this.http.get<ResListUserByProfileDTO[]>(`${this.back}/profile/${profile}`)
  }
}
