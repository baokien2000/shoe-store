import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminOrderData, AdminTableId } from "../../../../redux/adminSelector";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import "../../../../style/Admin/OrderPrint.css";
import { shoesHome } from "../../../../redux/selector";
import { useParams } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../TablePaginationActions";
import { Select } from "antd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast } from "react-toastify";
import axios from "axios";
import adminSlice from "../../../../redux/Slice/adminSlice";

const OrderDetail = () => {
    const componentRef = useRef();
    const orderId = useParams().orderId;

    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState()
    const [isUpdate, setIsUpdate] = useState(false);
    const [orderSelected, setOrderSelected] = useState(useSelector(AdminOrderData).find((order) => order._id === orderId));
    const [productList, setProductList] = useState([])
    const [orderList, setOrderList] = useState([])
    const [status, setStats] = useState();

    const shoes = useSelector(shoesHome)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminSlice.actions.setTab("order details"))

        let orderItem = shoes.filter((ListItem) =>
            orderSelected.orderItem.find((item) => item.ItemID === ListItem._id)
        );
        orderItem = orderItem.map((item) => {
            const order = orderSelected.orderItem.find((element) => element.ItemID === item._id);
            return {
                ...item,
                num: order.num,
            };
        })
        setOrderList(orderItem)
        const List = [...shoes].filter(i => !orderItem.find((item) => item._id === i._id)).map(item => {
            return {
                ...item,
                value: item._id,
                label: item.name,
            }
        });
        setProductList(List)
        setStats(orderSelected.status)
    }, [])


    const handleUpdate = async () => {
        setIsUpdate(preState => !preState)
        if (isUpdate === true) {


            const URL = 'https://kstore-api.cyclic.app/orders/Update'

            const token = localStorage.getItem("token")
            const header = `token: Bearer ${token}`;

            const total = renderTotal()
            const payload = {
                ...orderSelected, status: status, totalCost: total, orderItem: orderList.map(i => {
                    return { ItemID: i._id, num: i.num }
                })
            }
            try {
                const updateItem = await axios({
                    method: 'post',
                    url: URL,
                    data: payload,
                    headers: header
                })
                setOrderSelected(updateItem.data)

                toast.success("Update success")

            } catch (error) {
                console.log(error);
                toast.warning(error.response.data)
            }
        }
    }


    const handleChange = (ItemId) => {
        setProduct(ItemId);
    };
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };
    const handleItemQuantityChange = (item, e) => {
        setOrderList(preState => preState.map(i => {
            if (i._id === item._id) {
                return { ...item, num: e.target.value }
            } else {
                return i
            }
        }))
    }
    const AddToTable = () => {
        const selectedItem = productList.find((item) => item.value === product);

        if (product !== "" && quantity !== "" && quantity !== 0) {
            setQuantity();
            setOrderList((preState) => [...preState, { ...selectedItem, num: parseInt(quantity) }]);
            setProductList(state => state.filter(i => i._id !== product))
            setProduct("");
            setProduct(undefined)
        }
    };

    const handleRemoveItem = (item) => {
        setOrderList((preState) => preState.filter(i => i._id !== item._id));
        setProductList(preState => [...preState, item])
    }
    const renderTotal = () => {
        let total = 0
        orderList.forEach(i => {
            total += (i.price * (1 - i.sale / 100) * i.num)
        })
        return total.toFixed(2)
    }
    console.count("Render");
    const handleStatusChange = (e) => {
        setStats(e);
    }
    return (
        orderSelected && (
            <><div className="OrderDetail" ref={componentRef}>
                <p>Customer Details</p>
                <hr />
                <div className="CustomerDetails">
                    <span>Name</span>
                    <span style={{ cursor: isUpdate ? "not-allowed" : "default" }}>{orderSelected.name}</span>

                    <span>Contact</span>
                    <span style={{ cursor: isUpdate ? "not-allowed" : "default" }}>{orderSelected.phone}</span>

                    <span>Email</span>
                    <span style={{ cursor: isUpdate ? "not-allowed" : "default" }}>{orderSelected.email}</span>
                    <span>Gender</span>
                    <span style={{ cursor: isUpdate ? "not-allowed" : "default" }}>{orderSelected.gender} </span>
                </div>
                <p>Order Details</p>
                <hr />
                <div className="CustomerDetails OrderDetails">
                    <span>ID</span>
                    <span style={{ cursor: isUpdate ? "not-allowed" : "default" }}>{orderSelected._id}</span>
                    <span>Date</span>
                    <span style={{ cursor: isUpdate ? "not-allowed" : "default" }}>
                        {new Date(orderSelected.createdAt).toLocaleString("en-GB", { hour12: false }).slice(0, 17)}
                    </span>

                    <span>Status</span>
                    <span >{isUpdate ? <Select
                        className="StatusSelect"
                        value={status}
                        onChange={handleStatusChange}
                        options={[
                            { value: 'Paid', label: 'Paid' },
                            { value: 'Delivering', label: 'Delivering' },
                            { value: 'Done', label: 'Done' },
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Refunded', label: 'Refunded' },
                        ]}
                    /> : orderSelected.status}</span>

                    <span>Amount</span>
                    <span style={{ cursor: isUpdate ? "not-allowed" : "default" }}>{renderTotal()}$</span>
                </div>
                {isUpdate && <>
                    <p>Add item</p>
                    <hr />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <FormControl fullWidth size="small">


                                <Select
                                    showSearch
                                    onChange={handleChange}
                                    placeholder="Item Name"
                                    size="large"
                                    value={product}
                                    style={{ width: 200 }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={productList}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField size="small" InputProps={{
                                inputProps: { min: 0 }
                            }} type="number" required label="Quantity" value={quantity || ""} onChange={handleQuantityChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Button onClick={AddToTable} variant="contained">
                                Add product
                            </Button>
                        </Grid>
                    </Grid>
                </>}

                <p>Order Items</p>
                <hr />
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    {" "}
                                    <b>ID</b>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <b>Name</b>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <b>Cost</b>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <b>Quantity</b>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <b>Total</b>
                                </StyledTableCell>
                                {isUpdate && <StyledTableCell align="left">Action</StyledTableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderList.map((item, index) => (
                                <StyledTableRow key={item._id}>
                                    <StyledTableCell >
                                        {item._id.slice(item._id.length - 5)}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {item.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {(item.price * (1 - item.sale / 100)).toFixed(2)}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {isUpdate ? <TextField
                                            size="small"
                                            type="number"
                                            onChange={(e) => handleItemQuantityChange(item, e)}
                                            InputProps={{
                                                inputProps: { min: 0, max: 10 }
                                            }}
                                            defaultValue={item.num}
                                        /> : item.num}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {(item.price * (1 - item.sale / 100) * item.num).toFixed(2)}
                                    </StyledTableCell>
                                    {isUpdate && <TableCell onClick={() => handleRemoveItem(item)} style={{ width: 100, cursor: "pointer" }} align="left">
                                        <DeleteOutlineOutlinedIcon />
                                    </TableCell>}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <div className='Total'>
                <p>Total Cost: 333$</p>
            </div> */}


            </div>
                <div className='FooterBtn' style={{ display: "flex", justifyContent: "space-between" }}>
                    <ReactToPrint

                        trigger={() => (
                            <Button style={{ visibility: isUpdate ? "hidden" : "visible" }} className="PrintButton" variant="contained">
                                Print Receipt
                            </Button>
                        )}
                        content={() => componentRef.current}
                    />
                    <Button className="PrintButton" variant="contained" onClick={handleUpdate}>
                        {isUpdate ? "Apply" : "Update"}
                    </Button>
                </div>    
            </>

        )
    );
};

export default OrderDetail;
