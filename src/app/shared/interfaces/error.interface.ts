export interface ErrorFields {
  msg: string;
  param: string;
}

export interface ValidationError {
  errors: ErrorFields[];
}

export interface AdminError {
  message: string;
  errorCode: string;
}
