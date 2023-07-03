import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import adminSlice from '../../../redux/Slice/adminSlice';
import { shoesHome, userDetails } from '../../../redux/selector';
import axios from 'axios';
import shoesSlice from '../../../redux/Slice/shoesSlice';
import { toast } from 'react-toastify';
import { AdminUserData } from '../../../redux/adminSelector';
import userSlice from '../../../redux/Slice/userSlice';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteUser } from '../../../api/admin/user';
import { StyledTableCell, StyledTableRow, TablePaginationActions } from '../../TablePaginationActions';

const UserReport = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = useSelector(AdminUserData);
    const user = useSelector(userDetails);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const nagigate = useNavigate()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [open, setOpen] = useState(false);
    const [removeId, setRemoveId] = useState('')
    const handleClickOpen = (user) => {
        setOpen(true);
        setRemoveId(user)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminSlice.actions.setTab("user report"))
    }, [])

    const TableTitle = ['ID', 'Name', 'Gender', 'Email', 'Phone', 'Role', 'Action']

    const removeUserToggle = async () => {

        const controller = new AbortController()
        let isMounted = true

        try {
            const removeUser = await DeleteUser(removeId)
            toast.success("Remove success")
            isMounted && dispatch(userSlice.actions.DeleteUser(removeUser.data._id))
            return () => {
                isMounted = false
                controller.abort()
            }
        } catch (e) {
            if (e.response.status === 401) {
                nagigate("/login")
                toast.error(e.response.data)
            } else {
                if (e.response.status === 403) {
                    toast.warning(e.response.data)
                } else {
                    toast.error(e.response.data)
                }
            }
        } finally {
            handleClose();
        }
    }

    return (
        <div className="OrderReport">

            <TableContainer component={Paper} sx={{ maxWidth: "calc(100% - 60px)", margin: '30px' }} >
                <Table sx={{ maxWidth: "100%" }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {TableTitle.map((item, index) =>
                                <StyledTableCell key={index} align="left">{item}</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row, index) => (
                            <StyledTableRow key={row._id}>
                                <TableCell style={{ width: 80 }} >
                                    {row._id.slice(row._id.length - 5)}
                                </TableCell>
                                <TableCell align="left" component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="left">
                                    {row.gender}
                                </TableCell>
                                <TableCell style={{ width: 280 }} align="left">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{ width: 180 }} align="left">
                                    {row.phone.slice(0, 3) + " " + row.phone.slice(3, 6) + " " + row.phone.slice(6, 10)}
                                </TableCell>
                                <TableCell style={{ width: 80 }} align="left">
                                    {row.admin}
                                </TableCell>

                                <TableCell style={{ width: 100 }} align="left">
                                    {(row.admin !== "Super Admin" && user._id !== row._id) && <DisabledByDefaultOutlinedIcon sx={{ color: '#dc3545' }} onClick={() => handleClickOpen(row)} />}
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
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={12}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete User"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete user <b>{removeId.name}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={removeUserToggle} >
                        Yes
                    </Button>
                    <Button onClick={handleClose} autoFocus>No</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserReport;