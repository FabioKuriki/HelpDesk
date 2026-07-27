import { Component, Input } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-template',
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './dialog-template.html',
  styleUrl: './dialog-template.css',
})
export class DialogTemplate {
  @Input({required: true}) title!: string
}
