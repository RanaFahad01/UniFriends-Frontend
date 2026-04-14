export interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number; // 0-indexed
    totalElements: number;
    totalPages: number;
  };
}
