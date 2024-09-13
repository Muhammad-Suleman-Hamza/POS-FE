import { Order } from "./types";
import { GridColDef } from '@mui/x-data-grid';

export interface Data {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

export interface tableHeading {
    key: string,
    value: string
}

export interface TableProps {
    rows: any // update this when props decided
    headings: tableHeading[];
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