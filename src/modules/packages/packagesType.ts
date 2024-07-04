export interface PackagesDataType {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    short_description?: string;
    description?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
    duration?: string;
    flight_time?: string;
    price?: number;
    min_size?: number;
    max_size?: number;
    pricing_type?: string;
    type?: string;
}

export interface PackageGalleryDataType {
    id: number;
    package: number;
    file: string;
    file_type: string;
}