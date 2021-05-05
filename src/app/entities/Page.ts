export interface Page<T> {
  content: T[],
  size: number,
  number: number,
  totalPages: number,
  totalElements: number,
  first: boolean,
  last: boolean,
  empty: boolean
}
