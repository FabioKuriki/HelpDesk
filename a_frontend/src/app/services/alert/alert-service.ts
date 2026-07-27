import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
   show(title: string, text: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK'
    });
  }

  success(text: string, title = 'Sucesso') {
    return this.show(title, text, 'success');
  }

  error(text: string, title = 'Erro') {
    return this.show(title, text, 'error');
  }

  warning(text: string, title = 'Atenção') {
    return this.show(title, text, 'warning');
  }

  info(text: string, title = 'Informação') {
    return this.show(title, text, 'info');
  }

  confirm(text: string, title = 'Confirmação') {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
  }
}
