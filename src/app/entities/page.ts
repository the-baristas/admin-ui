export interface Page<T> {
    content: T[];
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
}