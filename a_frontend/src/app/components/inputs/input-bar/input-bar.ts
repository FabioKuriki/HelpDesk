import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input-bar.html',
  styleUrl: './input-bar.css',
})
export class InputBar {
  @Input() placeholder = 'text';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() control!: FormControl;
}