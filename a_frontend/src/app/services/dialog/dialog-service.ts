import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
    readonly dialog = inject(MatDialog);

  openDialog(component: ComponentType<any>, width: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(component, {
        width: width,
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
}
