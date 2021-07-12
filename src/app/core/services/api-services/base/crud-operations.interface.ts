import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/base-model/list-response-model.model';
import { ResponseModel } from 'src/app/core/models/base-model/respnse-model.model';
import { SingleResponseModel } from 'src/app/core/models/base-model/single-response-model.model';

export interface CrudOperations<T, ID> {
  add(t: T): Observable<ResponseModel>;
  update(t: T): Observable<ResponseModel>;
  getById(id: ID): Observable<SingleResponseModel<T>>;
  getAll(): Observable<ListResponseModel<T>>;
  delete(id: ID): Observable<ResponseModel>;
}
