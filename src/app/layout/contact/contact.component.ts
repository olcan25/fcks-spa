import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MailSenderDto } from 'src/app/core/models/mail/mail-sender.model';
import { AlertifyService } from 'src/app/core/services/alert-service/alertify.service';
import { MailService } from 'src/app/core/services/mail-service/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  addForm: FormGroup = new FormGroup({});
  mailSender: MailSenderDto = new MailSenderDto();
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private mailService: MailService,
    private alertifyService: AlertifyService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      senderEmail: ['', [Validators.email, Validators.required]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onAdd() {
    debugger;
    this.mailSender = Object.assign({}, this.addForm.value);
    this.mailService
      .contactMail(this.mailSender)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.alertifyService.success(response), this.createFormGroup();
        },
        (err) => console.log('Islem Gerceklesemedi'),
        () => console.log('Islem Tamam')
      );
  }
}
