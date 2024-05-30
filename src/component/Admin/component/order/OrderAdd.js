import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminSlice from "../../../../redux/Slice/adminSlice";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { shoesHome } from "../../../../redux/selector";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { StyledTableCell, StyledTableRow } from "../../../TablePaginationActions";


const OrderAdd = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState("");
    const [tableItem, setTableItem] = useState([]);
    const [errorText, setErrorText] = useState("");
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const nagigate = useNavigate()

    useEffect(() => {
        dispatch(adminSlice.actions.setTab("add order"));
    }, []);


    const handleChange = (ItemId) => {
        setProduct(ItemId);
    };
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const productList = [...useSelector(shoesHome)].map(item => {
        return {
            ...item,
            value: item._id,
            label: item.name,
        }
    });

    const AddToTable = () => {
        const selectedItem = productList.find((item) => item.value === product);

        if (product !== "" && quantity !== "" && quantity != 0) {
            setTableItem((preState) => [...preState, { ...selectedItem, quantity: parseInt(quantity) }]);
            setProduct("");
            setQuantity("");
            setProduct(undefined)
        }
    };
    const navigate = useNavigate();

    const setAdminTab = (name, id) => {
        dispatch(adminSlice.actions.setTab(name))
        dispatch(adminSlice.actions.setCurrentId(id))
    }


    const handleAddOrder = async () => {
        if (name === '' || phone === '' || email === '') {
            setErrorText("fields * in 'Add Customer Info' is required");
            return;
        }
        if (tableItem.length === 0) {
            setErrorText("You not have any product on cart!");
            return;
        }
        setErrorText("");
        let totalCost = 0
        tableItem.forEach(element => {
            totalCost += (element.price * (1 - element.sale / 100)) * element.quantity
        });
        const orderItem = tableItem.map(item => {
            return {
                ItemID: item.label,
                num: item.quantity,
            }
        })

        const payload = {
            name: name,
            phone: phone,
            totalCost: totalCost.toFixed(2),
            status: 'New',
            email: email,
            gender: gender,
            orderItem: orderItem
        }
        const url = 'https://kstore-api.vercel.app/orders'
        const token = localStorage.getItem("token")
        const header = `token: Bearer ${token}`;

        try {
            const response = await axios({
                method: 'post',
                url: url,
                data: payload,
                headers: header,
            });
            toast.success("Add success")
            dispatch(adminSlice.actions.addOrder(response.data))
            setAdminTab('order details', response.data._id)
            navigate(`/admin/order/${response.data._id}`)
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
        }
    };
    const handleRemoveItem = (id) => {
        setTableItem((preState) => preState.filter(i => i._id !== id));

    }
    return (
        <div className="OrderAdd">
            {/* xs, sm, md, lg, and xl. */}
            <h5>Add customer Info</h5>
            <hr />
            <Grid container spacing={4} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField size="small" required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField size="small" type={'number'} required label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField size="small" required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField size="small" label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                </Grid>
            </Grid>

            <h5>Add item</h5>
            <hr />
            <Grid container spacing={4} sx={{ mb: 2 }}>
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
                    }} type="number" required label="Quantity" value={quantity} onChange={handleQuantityChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button onClick={AddToTable} variant="contained">
                        Add product
                    </Button>
                </Grid>
            </Grid>

            <h5>Order item</h5>
            <hr />
            <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                <Table sx={{ maxWidth: "100%" }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Cost</StyledTableCell>
                            <StyledTableCell align="left">Units</StyledTableCell>
                            <StyledTableCell align="left">Total Cost</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableItem.map((row) => (
                            <StyledTableRow key={row.value}>
                                <TableCell style={{ width: 50 }}> {row._id.slice(row._id.length - 5)} </TableCell>
                                <TableCell align="left" component="th" scope="row">
                                    {row.label}
                                </TableCell>
                                <TableCell style={{ width: 120 }} align="left">
                                    {(row.price * (1 - row.sale / 100)).toFixed(2)}
                                </TableCell>
                                <TableCell style={{ width: 120 }} align="left">
                                    {row.quantity}
                                </TableCell>
                                <TableCell style={{ width: 140 }} align="left">
                                    {((row.price * (1 - row.sale / 100)) * row.quantity).toFixed(2)}
                                </TableCell>
                                <TableCell onClick={() => handleRemoveItem(row._id)} style={{ width: 100, cursor: "pointer" }} align="left">
                                    <DeleteOutlineOutlinedIcon />
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="footer">
                <span>{errorText}</span>
                <Button onClick={handleAddOrder}>Add Order</Button>
            </div>
        </div>
    );
};

export default OrderAdd;
