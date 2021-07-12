import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NgBootstrapModalService {
  constructor(private modalService: NgbModal) {}

  openCreateModal(
    createComponent: any,
    ngUnsubscribe: Subject<void>,
    okCallback: any
  ) {
    const modalRef = this.modalService.open(createComponent);
    modalRef.closed.pipe(takeUntil(ngUnsubscribe)).subscribe(
      (response) => {
        console.log(response), okCallback();
      },
      (err) => console.log(err),
      () => console.log('Islem Bitti')
    );
  }

  openUpdateModal(
    id: number,
    updateComponent: any,
    ngUnsubscribe: Subject<void>,
    okCallback: () => void
  ) {
    const modalRef = this.modalService.open(updateComponent);
    modalRef.componentInstance.id = id;
    modalRef.closed.pipe(takeUntil(ngUnsubscribe)).subscribe(
      (response) => {
        console.log(response), okCallback();
      },
      (err) => console.log(err),
      () => console.log('Islem Bitti')
    );
  }
}
