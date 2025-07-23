export interface ErrorMessage {
  error_code: string;
  error_message: string;
}

export interface CommonResponse<T = any> {
  status_code: string;
  data: T | {};
  error_messages: ErrorMessage[];
  total_items: number;
}
