import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/core/models/base-model/respnse-model.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}
  apiUrl: string = environment.baseUrl;

  addCompanyImage(
    companyId: number,
    formData: FormData
  ): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      this.apiUrl + `companyimages/${companyId}`,
      formData
    );
  }

  deleteCompanyImage(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.apiUrl + `companyimages/${id}`);
  }
}
