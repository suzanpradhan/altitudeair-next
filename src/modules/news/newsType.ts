export interface NewsDataType {
  id: number;
  title?: string;
  description?: string;
  content?: string;
  date?: string;
  publisherImage?: string;
  publisher?: string;
  isFeatured?: boolean;
  coverImage?: string;
}

export interface PaginationInfoType {
  next: string | null;
  previous: string | null;
  count: number;
  total_page: number;
  current_page: number;
}

export interface PaginatedNewsResponseType {
  pagination: PaginationInfoType;
  results: NewsDataType[];
}
