export class PaginationWrapper<T> {
  results: T[];
  page_total: number;
  total: number;
}

export class PaginationParams {
  page: number;
  limit: number;
}
