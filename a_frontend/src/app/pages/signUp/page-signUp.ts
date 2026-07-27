import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Button } from "../../components/button/button";
import { UserService } from '../../services/backend/user/user-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../../services/backend/ticket/ticket-service';
import { InputBar } from '../../components/inputs/input-bar/input-bar';
import { ReqUserSignUpDTO } from '../../models/user/req/req-user-signUp-dto';
import { AlertService } from '../../services/alert/alert-service';

@Component({
  selector: 'app-page-sign-up',
  imports: [InputBar, Button, ReactiveFormsModule],
  templateUrl: './page-signUp.html',
  styleUrl: './page-signUp.css',
})
export class SignUp {
  private userService = inject(UserService);
  private ticketService = inject(TicketService);
  private alertService = inject(AlertService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(){
    this.getCountAllUsers();
    this.getCountAllSolvedTickets();
  }

  useSignUp(dto: ReqUserSignUpDTO){
    this.userService.signUp(dto)
    .subscribe({
      next: (res) => this.alertService.success('Cadastro realizado com sucesso'),
      error: (err) => this.alertService.error('Ocorreu um erro durante o cadastro')
    })
  }

  singUpForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    profile: new FormControl('SOLICITANTE', { nonNullable: true })
  })

  countUsers: any = 0;

  getCountAllUsers(){
    return this.userService.countAllUsers()
    .subscribe(
      (res) => {
        this.countUsers = res
        this.cdr.markForCheck()
      }
    )
  }

  countSolvedTickets: any = 0;

  getCountAllSolvedTickets(){
    return this.ticketService.countAllStatusTickets("RESOLVIDO")
    .subscribe(
      (res) => {
        this.countSolvedTickets = res
        this.cdr.markForCheck()
      }
    )
  }
}
