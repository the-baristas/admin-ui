export interface Page<T> {
    content: T[];
    size: number;
    number: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
