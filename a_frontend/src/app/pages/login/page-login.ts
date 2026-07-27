import { Component, inject } from '@angular/core';
import { Button } from '../../components/button/button';
import { UserService } from '../../services/backend/user/user-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputBar } from '../../components/inputs/input-bar/input-bar';
import { Router } from '@angular/router';
import { ReqUserLoginDTO } from '../../models/user/req/req-user-login-dto';
import { AlertService } from '../../services/alert/alert-service';

@Component({
  selector: 'app-page-login',
  imports: [InputBar, Button, ReactiveFormsModule],
  templateUrl: './page-login.html',
  styleUrl: './page-login.css',
})
export class Login {
  private userService = inject(UserService)
  private alertService = inject(AlertService)
  private router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  })

  useLogin(dto: ReqUserLoginDTO){
    this.userService.login(dto)
    .subscribe(
      {
        next: (res) => {
          this.alertService.success('Login realizado com sucesso');
          this.router.navigate(['/access/profile']);
        },
        error: (err) => this.alertService.error('Login Inválido')
      }
    ) 
  }
}
