export interface ReportGetAllDto {
    page: number;
    pageSize: number;
    site: string;
    order: string[];
}

export interface ReportCreateAutomaticsReportsDto {
    roundId: string;
}

export interface ReportUpdateDto {
    _id: string;
    round: string; //RoundI;
    winner: string;
    votes1: number;
    car1: any;
    votes2: number;
    car2: any;
}
