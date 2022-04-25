export interface CarGetAllDto {
    page: number;
    pageSize: number;
    site: string;
    order: string[];
    brand?: string;
}

export interface CarGetOneDto {
    id: string;
    site: string;
}
