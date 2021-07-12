import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  success(message: string) {
    alertify.success('Basarili Mesaj: ' + message);
  }

  error(message: string) {
    alertify.error('Hatali Mesaj: ' + message);
  }

  warning(message: string) {
    alertify.warning('Uyari Mesaji: ' + message);
  }

  confirm(title: string, message: string,okCallback:()=>any) {
    alertify.confirm(
      'Confirm Title',
      'Confirm Message',
      function () {
        okCallback();
        alertify.success('Tamam');
      },
      function () {
        alertify.error('Iptal');
      }
    );
  }
}
