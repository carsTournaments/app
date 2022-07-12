export interface CarGetAllDto {
    page: number;
    pageSize: number;
    site: string;
    order: string[];
    onlyWithPhoto: boolean;
    brand?: string;
}

export interface CarGetGlobalRankingDto {
    limit: number;
    order: string;
}

export interface CarGetOneDto {
    id: string;
    site: string;
}
