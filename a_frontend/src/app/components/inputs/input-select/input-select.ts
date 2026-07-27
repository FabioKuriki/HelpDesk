import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  imports: [ReactiveFormsModule],
  templateUrl: './input-select.html',
  styleUrl: './input-select.css',
})
export class InputSelect {
  @Input() placeholder:string = ""
  @Input({required: true}) items: string[] = []
  @Input() control!: FormControl;
}
