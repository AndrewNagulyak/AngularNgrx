export interface HttpWrapper<T> {
  error_message: string;
  data: T;
  status: string;
}

export interface HttpWrapperArray<T> {
  error_message: string;
  data: T[];
  status: string | 'ok';
}

export interface HttpWrapperCollection<T> {
  error_message: string;
  data: {
    rows: T[];
    total_count: number;
  };
  status: string | 'ok';
}


