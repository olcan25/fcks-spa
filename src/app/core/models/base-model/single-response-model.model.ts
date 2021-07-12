import { ResponseModel } from './respnse-model.model';

export interface SingleResponseModel<T> extends ResponseModel {
  data: T;
}
