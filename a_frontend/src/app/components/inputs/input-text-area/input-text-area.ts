import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text-area',
  imports: [ReactiveFormsModule],
  templateUrl: './input-text-area.html',
  styleUrl: './input-text-area.css',
})
export class InputTextArea {
  @Input() placeholder = ""
  @Input() control!: FormControl;
}
