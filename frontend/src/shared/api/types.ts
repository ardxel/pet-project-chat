export interface DataResponse<Data> {
  status: 'error' | 'fail' | 'success';
  message?: string | string[];
  payload: Data;
  stack?: unknown;
}
