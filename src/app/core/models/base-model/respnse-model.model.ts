import {Error} from './error-fluent-validation.model'

export interface ResponseModel {
  message: string;
  success: boolean;
  errors:Error[]
}
