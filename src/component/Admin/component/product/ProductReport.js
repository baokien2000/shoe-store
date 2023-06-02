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
import adminSlice from '../../../../redux/Slice/adminSlice';
import { shoesHome } from '../../../../redux/selector';
import axios from 'axios';
import shoesSlice from '../../../../redux/Slice/shoesSlice';
import { toast } from 'react-toastify';

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


const ProductReport = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = useSelector(shoesHome);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminSlice.actions.setTab("product report"))
    }, [])

    const TableTitle = ['ID', 'Name', 'Brand', 'Price', 'Rate', 'Sale', 'Size', 'Action']

    const removeShoesToggle = async (row) => {
        const controller = new AbortController()
        let isMounted = true
        const URL = 'http://localhost:5000/shoes/Delete'
        try {
            const removeItem = await axios({
                method: 'delete',
                url: URL,
                data: row,
                signal: controller.signal,
            })
            toast.success("Remove success")
            isMounted && dispatch(shoesSlice.actions.deleteShoes(removeItem.data._id))
            return () => {
                isMounted = false
                controller.abort()
            }
        } catch (e) {
            console.log(e)
            toast.success("Remove false")
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
                                    {row.brand}
                                </TableCell>
                                <TableCell style={{ width: 80 }} align="left">
                                    {row.price}
                                </TableCell>
                                <TableCell style={{ width: 60 }} align="left">
                                    {row.rate}
                                </TableCell>
                                <TableCell style={{ width: 60 }} align="left">
                                    {row.sale}
                                </TableCell>
                                <TableCell style={{ width: 200 }} align="left">
                                    {row.size.map((item, index) => {
                                        return index === 0 ? item : ", " + item
                                    })}
                                </TableCell>

                                <TableCell style={{ width: 100 }} align="left">
                                    <DisabledByDefaultOutlinedIcon sx={{ color: '#dc3545' }} onClick={() => removeShoesToggle(row)} />
                                    <Link to={`/admin/product-report/${row._id}`} >
                                        <OpenInNewOutlinedIcon />
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
        </div>
    );
};

export default ProductReport;