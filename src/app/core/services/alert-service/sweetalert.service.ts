import { Injectable } from '@angular/core';
declare let swal: any;

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  confrim(okCallback: () => void) {
    swal({
      title: 'Silmek Istediginizden Eminmisiniz?',
      text: 'Silindikten Sonra Bu Dosyayi Kurtaramazsiniz...',
      icon: 'error',
      buttons: ['Iptal','Tamam'],
      dangerMode: true,
    }).then((willDelete: boolean) => {
      if (willDelete) {
        swal('Uzgunum! Dosyaniz Silinmistir...', {
          icon: 'success',
          button: 'Tamam'
        });
        okCallback();
      } else {
        swal('Dosyaniz Guvende...', {
          icon: 'info',
          button: 'Tamam'
        });
      }
    });
  }
}
