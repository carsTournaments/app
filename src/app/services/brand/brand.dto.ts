export interface BrandGetAllDto {
  page: number;
  pageSize: number;
  site: string;
  order: string[];
  select?: string[];
}

export interface BrandGetAllBrandsAndCarsDto {
  page: number;
  pageSize: number;
  order: string[];
}

