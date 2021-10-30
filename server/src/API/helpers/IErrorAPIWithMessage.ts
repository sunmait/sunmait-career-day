import { IErrorAPI } from './IErrorAPI';

export interface IErrorAPIWithMessage extends IErrorAPI {
  message: string;
}
