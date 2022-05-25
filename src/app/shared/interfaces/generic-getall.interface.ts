import { PaginatorI } from './paginator.interface';

export interface GenericGetAllI<T> {
    items: T[];
    paginator: PaginatorI;
}
