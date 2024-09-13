import './style.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { tableHeading, TableProps } from '../../helpers/interfaces';

export default function DenseTable({
    rows, 
    headings
}: TableProps) {
  return (
    <>
        <h1>Items</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    {headings.map((heading: tableHeading, index: number) => (
                        <TableCell key={heading.key} align={index === 0 ? 'left' : 'center'}><b>{heading.value}</b></TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row: any) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.weight}</TableCell>
                    <TableCell align="center">{row.dimensions}</TableCell>
                    <TableCell align="center">{row.measuringUnit}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  );
}