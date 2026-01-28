export type ApiResult<T> =
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: string;
    };
