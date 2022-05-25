export interface LogsGetAllI {
    methods: LogItem[];
    roles: LogItem[];
    urls: LogItem[];
    days: LogItem[];
}

export interface LogItem {
    name: string;
    count: number;
    method?: string;
    role?: string;
}
