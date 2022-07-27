export interface LikeGetAllDto {
  page: number;
  pageSize: number;
  site: string;
  order: string[];
}

export interface LikeGetAllOfCarDto {
  id: string;
  limit: string;
}
