import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DialogTemplate } from "../_dialog-template/dialog-template";
import { InputBar } from "../../inputs/input-bar/input-bar";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/backend/user/user-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReqUserEditDTO } from '../../../models/user/req/req-user-edit-dto';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [DialogTemplate, MatButtonModule, MatDialogClose, InputBar, ReactiveFormsModule],
  templateUrl: './dialog-edit-user.html',
  styleUrl: './dialog-edit-user.css',
})
export class DialogEditUser {
  private userService = inject(UserService)
  private cdr = inject(ChangeDetectorRef)
  private dialogRef = inject(MatDialogRef<DialogEditUser>)

  ngOnInit(){
    this.getLoggedUserdata();
  }

  editUserForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  })

  getLoggedUserdata(){
    this.userService.LoggedUserdata()
    .subscribe({
      next: (res) => {
        this.editUserForm.setValue(res),
        this.cdr.markForCheck()
      }
    })
  }

  getEditUser(dto: ReqUserEditDTO){
    this.userService.editUser(dto)
    .subscribe()
  }
}
