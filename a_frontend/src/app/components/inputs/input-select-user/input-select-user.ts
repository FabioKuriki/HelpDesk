import { Component, Input } from '@angular/core';
import { ResListUserByProfileDTO } from '../../../models/user/res/res-list-user-byProfile-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-select-user',
  imports: [ReactiveFormsModule],
  templateUrl: './input-select-user.html',
  styleUrl: './input-select-user.css',
})
export class InputSelectUser {
  @Input() placeholder = "";
  @Input({required: true}) users!: ResListUserByProfileDTO[];
  @Input() control!: FormControl;
}
