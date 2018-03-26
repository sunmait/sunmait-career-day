import IErrorAPI from './IErrorAPI';

export default interface IErrorAPIWithMessage extends IErrorAPI {
  message: string;
}
