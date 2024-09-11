import { Order } from "./types";

export interface Data {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps {
    items: any // update this when props decided
    tableName: string;
    headings: string[];
}

export interface EnhancedTableHeadProps {
    order: Order;
    orderBy: string;
    rowCount: number;
    headings: string[];
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
}

export interface EnhancedTableToolbarProps {
    tableName: string;
    numSelected: number;
}