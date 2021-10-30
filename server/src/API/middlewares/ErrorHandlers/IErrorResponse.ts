export interface IErrorResponse {
  status: string;
  code: number;
  message: string;
  errors?: { [key: string]: string };
}
