import { ResponseModel } from './respnse-model.model';

export interface ListResponseModel<T> extends ResponseModel {
  data: T[];
}
