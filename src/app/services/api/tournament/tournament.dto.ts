export interface TournamentGetAllDto {
    page: number;
    pageSize: number;
    site: string;
    order: string[];
}

export interface TournamentCreateDto {
    name: string;
    driver: any; // UserI
    brand: any; // BrandI
    traction: string;
    cv: number;
    cc: number;
    image: string;
    stock: boolean;
}

export interface TournamentUpdateDto {
    _id: string;
    name?: string;
    driver?: any; // UserI
    brand?: any; // BrandI
    traction?: string;
    cv?: number;
    cc?: number;
    stock?: boolean;
    image?: string;
    info?: string;
}
