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
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import adminSlice from '../../../redux/Slice/adminSlice';
import { shoesHome } from '../../../redux/selector';
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

//Table Pagination
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };
    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };
    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

// Styled Component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const UserReport = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = useSelector(AdminUserData);
    console.log(rows)
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
    // const handleClick = () => {
    //     const controller = new AbortController();
    //     const URL = 'http://localhost:5000/users/refresh'
    //     const refresh = async () => {
    //         try {
    //             const response = await axios({
    //                 url: URL,
    //                 method: 'post',
    //                 data: [],
    //                 withCredentials: true,
    //                 signal: controller.signal,
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             })


    //         } catch (e) {
    //             if (e.response.status === 404) {
    //                 console.log('Username or password is not correct')
    //             }
    //         }
    //     }
    //     refresh()
    //     return () => {
    //         controller.abort()
    //     }
    // }
    const TableTitle = ['ID', 'Name', 'Gender', 'Email', 'Phone', 'Role', 'Action']

    const removeUserToggle = async () => {

        const controller = new AbortController()
        let isMounted = true
        const URL = 'http://localhost:5000/users/Delete'

        try {
            const removeUser = await axios({
                method: 'delete',
                url: URL,
                data: removeId,
                signal: controller.signal,
            })
            toast.success("Remove success")
            isMounted && dispatch(userSlice.actions.DeleteUser(removeUser.data._id))
            return () => {
                isMounted = false
                controller.abort()
            }
        } catch (e) {
            console.log(e)
            toast.success("Remove false")
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
                        ).map((row) => (
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
                                    {row.phone}
                                </TableCell>
                                <TableCell style={{ width: 80 }} align="left">
                                    {row.admin}
                                </TableCell>

                                <TableCell style={{ width: 100 }} align="left">
                                    <DisabledByDefaultOutlinedIcon sx={{ color: '#dc3545' }} onClick={() => handleClickOpen(row)} />


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
                                colSpan={6}
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