import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AdminOrderData, AdminTableId } from '../../../../redux/adminSelector';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import '../../../../style/Admin/OrderPrint.css'
import { shoesHome } from '../../../../redux/selector';
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

const OrderDetail = () => {
    const componentRef = useRef();
    const [itemList, setItemList] = []

    const detailID = useSelector(AdminTableId);
    const orderSelected = useSelector(AdminOrderData).find(order => order._id == detailID);
    const test = useSelector(AdminOrderData)

    let orderItem = useSelector(shoesHome)
        .filter(ListItem => orderSelected.orderItem
            .find(item => item.ItemID === ListItem._id))

    orderItem = orderItem.map(item => {
        const test = orderSelected.orderItem.find(element => element.ItemID === item._id)
        return {
            ...item,
            num: test.num,
        }
    })


    return (<>
        <div className='OrderDetail' ref={componentRef}>
            <p>Customer Details</p>
            <hr />
            <div className='CustomerDetails'>
                <span>ID</span>
                <span  >{orderSelected._id}</span>
                <span >Customer Name</span>
                <span >{orderSelected.name}</span>

                <span >Contact Number</span>
                <span >{orderSelected.phone}</span>
                <span >Order Date</span>
                <span >{(new Date(orderSelected.createdAt)).toLocaleString('en-GB', { hour12: false, })}</span>

                <span >Email</span>
                <span >{orderSelected.email}</span>
                <span >Gender</span>
                <span >{orderSelected.gender}       </span>

                <span >Order Status</span>
                <span >{orderSelected.status}</span>
                <span >Total Amount</span>
                <span >{orderSelected.totalCost}$</span>
            </div>
            <p>Order Items</p>
            <hr />
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell> <b>ID</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Product Name</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Cost</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Total Item</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Total Cost</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderItem.map((item, index) => (
                            <StyledTableRow key={item._id}>
                                <StyledTableCell style={{ width: 100 }} > {item._id}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">{item.name}</StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="left">{(item.price * (1 - item.sale / 100)).toFixed(2)}</StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="left">{item.num}</StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="left">{((item.price * (1 - item.sale / 100)) * item.num).toFixed(2)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div className='Total'>
                <p>Total Cost: 333$</p>
            </div> */}

        </div>
        <ReactToPrint
            trigger={() => <Button className='PrintButton' variant="contained">Print Receipt</Button>}
            content={() => componentRef.current}
        />
    </>


    );
};

export default OrderDetail;