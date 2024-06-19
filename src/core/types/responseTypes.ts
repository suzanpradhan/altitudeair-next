export interface PaginationType {
    total_page: number;
    count: number;
    current_page: number;
    perPage: number;
    next: string;
    previous: string;
}

export interface PaginatedResponseType<T> {
    results: Array<T>;
    pagination: PaginationType;
}