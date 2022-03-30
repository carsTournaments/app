export interface CarGetAllDto {
  page: number;
  pageSize: number;
  site: string;
  order: string[];
  brand?: string;
}

