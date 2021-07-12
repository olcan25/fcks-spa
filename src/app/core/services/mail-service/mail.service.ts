import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MailSenderDto } from '../../models/mail/mail-sender.model';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  apiUrl: string = environment.baseUrl + 'home/contact';

  constructor(private http: HttpClient) {}

  contactMail(mailSender: MailSenderDto): Observable<string> {
    return this.http.post<string>(this.apiUrl, mailSender);
  }
}
