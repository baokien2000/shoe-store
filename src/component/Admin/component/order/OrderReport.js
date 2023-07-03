import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from 'react-redux';
import adminSlice from '../../../../redux/Slice/adminSlice';
import { AdminOrderData } from '../../../../redux/adminSelector';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, FormLabel } from 'react-bootstrap';
import { StyledTableCell, StyledTableRow, TablePaginationActions } from '../../../TablePaginationActions';
import TableCell from '@mui/material/TableCell';


export default function OrderReport() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = useSelector(AdminOrderData);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dispatch = useDispatch();
    const setAdminTab = (name, id) => {
        dispatch(adminSlice.actions.setTab(name))
        dispatch(adminSlice.actions.setCurrentId(id))
    }

    useEffect(() => {
        dispatch(adminSlice.actions.setTab("order report"))
    }, [])

    const StatusStyle = (status) => {
        switch (status) {
            case "Paid":
                return { backgroundColor: "#31b5e5" }
            case "Delivering":
                return { backgroundColor: "#2e6ea5" }
            case "Done":
                return { backgroundColor: "#01c74f" }
            case "Pending":
                return { backgroundColor: "#fe8900" }
            case "Refunded":
                return { backgroundColor: "#f54337" }
            default:
                return { backgroundColor: "#9e9e9e" }
        }
    }
    return (
        <div className="OrderReport">

            <TableContainer component={Paper} sx={{ maxWidth: "calc(100% - 60px)", margin: '30px' }} >
                <Table sx={{ maxWidth: "100%" }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="left">Status</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Phone</StyledTableCell>
                            <StyledTableCell align="left">Amount</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow key={row._id}>
                                <TableCell style={{ width: 50 }} >
                                    {row._id.slice(row._id.length - 5)}
                                </TableCell>
                                <TableCell style={{ width: 100 }} >
                                    <div className='OrderStatus' style={{ ...StatusStyle(row.status), color: "white", padding: "5px 20px", borderRadius: "3px", textAlign: "center" }}>
                                        {row.status}
                                    </div>
                                </TableCell>
                                <TableCell align="left" component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ width: 140 }} align="left">
                                    {row.phone}
                                </TableCell>
                                <TableCell style={{ width: 140 }} align="left">
                                    {row.totalCost}
                                </TableCell>
                                <TableCell style={{ width: 240 }} align="left">
                                    {(new Date(row.createdAt)).toLocaleString('en-GB', { hour12: false, })}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="left">
                                    <Link to={`/admin/order-report/${row._id}`}>
                                        <OpenInNewIcon onClick={() => setAdminTab('order details', row._id)} />
                                    </Link>

                                </TableCell>
                            </StyledTableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: (57 * emptyRows) - 1 }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                colSpan={12}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    // native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}

                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/admin/order-add">
                    <Button className='AddButton' variant="contained">
                        Add order
                    </Button>
                </Link>
            </div>
        </div>
    );
}
