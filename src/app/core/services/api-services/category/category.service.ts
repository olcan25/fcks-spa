import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CrudService } from '../base/crud.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CrudService<Category, number> {
  constructor(private http: HttpClient) {
    super(http, `categories`);
  }
}
