import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import adminSlice from '../../../../redux/Slice/adminSlice';

import { Grid, InputAdornment, TextField } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import shoesSlice from '../../../../redux/Slice/shoesSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { shoesHome } from '../../../../redux/selector';
import NotFoundPage from '../../../NotFound/NotFoundPage';
import Loading from '../../../Loading';

import { Button, Space } from 'antd';
import { ProductImage } from './ProductImage';


const sizes = ['36', '37', '38', '39', '40', '41', '42']

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ProductInfo = () => {
    const dispatch = useDispatch();

    const productId = useParams().productId
    const shoesList = useSelector(shoesHome)
    const product = useSelector(shoesHome).find(item => item._id === productId)

    const [URLInput, setURLInput] = useState("")
    const [URL, setURL] = useState("")
    const [size, setSize] = useState([])
    const [error, setError] = useState('')

    const [productName, setProductName] = useState("")
    const [productBrand, setProductBrand] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productRate, setProductRate] = useState("")
    const [productSale, setProductSale] = useState("")
    const [productColor, setProductColor] = useState("")

    const nagigate = useNavigate()

    useEffect(() => {
        if (productId && product) {
            setURLInput(product.imageUrl)
            setURL(product.imageUrl)
            setSize(product.size)
            setProductName(product.name)
            setProductBrand(product.brand)
            setProductPrice(product.price)
            setProductRate(product.rate)
            setProductSale(product.sale)
            setProductColor(product.color)
        }
    }, [product])
    const [edit, setEdit] = useState(productId ? false : true)

    useEffect(() => {
        dispatch(adminSlice.actions.setTab(productId ? "product details" : "add product"))
    }, [])

    const CheckURL = (URL) => {
        const image = new Image();
        image.onload = () => { setURL(URL) }
        image.onerror = () => { setURL('error') }
        image.src = URL
    }



    const handleChange = (event) => {
        if (edit || !productId) {
            const { target: { value }, } = event;
            setSize(typeof value === 'string' ? value.split(',') : value);
        }
    };

    useEffect(() => {
        if (error !== '') {
            setError('')
        }
    }, [productName, productColor, productBrand, productPrice, productRate, productSale, size, URLInput])


    const EditProductToggle = async () => {
        if (!edit && product) {
            setEdit(!edit)
            return;
        }
        if (productName === ''
            || productBrand === ''
            || productPrice === ''
            || productRate === ''
            || productSale === ''
            || productColor === ''
            || size.length === 0
        ) {
            setError('Fields * is required')
            return;
        }

        if (URL === '' || URL === 'error') {
            setError('Please add a valid Image URL')
            return;
        }

        const controller = new AbortController()
        let isMounted = true;
        const UpdateUrl = 'https://kstore-api.cyclic.app/shoes' + (productId ? "/Update" : "")
        const payload = productId ? {
            ...product,
            _id: product._id,
            name: productName,
            brand: productBrand,
            color: productColor,
            rate: productRate,
            size: size,
            sale: productSale,
            price: productPrice,
            imageUrl: URL,
        } : {
            name: productName,
            brand: productBrand,
            price: productPrice,
            size: size,
            rate: productRate,
            sale: productSale,
            color: productColor,
            cart: 0,
            imageUrl: URL,
        }

        const token = localStorage.getItem("token")
        const header = `token: Bearer ${token}`;
        try {
            const updateProduct = await axios({
                method: 'post',
                url: UpdateUrl,
                data: payload,
                signal: controller.signal,
                headers: header,
            })
            toast.success(productId ? "Update product success" : "Add success")

            if (productId) {
                isMounted && dispatch(shoesSlice.actions.updateShoes(updateProduct.data))
                setEdit(false)
            } else {
                setProductName('')
                setProductBrand('')
                setProductColor('')
                setProductPrice('')
                setProductSale('')
                setProductRate('')
                setSize([])
                setURLInput('')
                setURL('')
                isMounted && dispatch(shoesSlice.actions.addShoes(updateProduct.data))

            }


            return () => {
                isMounted = false;
                controller.abort()
            }
        } catch (e) {
            console.log(e)
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
    }

    return (
        shoesList.length !== 0 ?
            (product || !productId) ?
                <div className='AddProduct'>
                    <div className='product'>
                        <ProductImage URL={URL} />
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} lg={4}>
                                <TextField InputProps={{ readOnly: !edit, }} size="small" required label="Name" sx={{ width: "100%" }}
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <TextField InputProps={{ readOnly: !edit, }} size="small" required label="Brand" sx={{ width: "100%" }}
                                    value={productBrand}
                                    onChange={(e) => setProductBrand(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <TextField InputProps={{ readOnly: !edit, }} size="small" type={'number'} required label="Price" sx={{ width: "100%" }}
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <TextField InputProps={{ readOnly: !edit, }} size="small" type={'number'} required label="Rate" sx={{ width: "100%" }}
                                    value={productRate}
                                    onChange={(e) => setProductRate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <TextField InputProps={{ readOnly: !edit, }} size="small" type={'number'} required label="Sale" sx={{ width: "100%" }}
                                    value={productSale}
                                    onChange={(e) => setProductSale(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <FormControl size='small' sx={{ width: "100%" }}>

                                    <InputLabel required   >Size</InputLabel>
                                    <Select
                                        multiple
                                        value={size}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}

                                    >
                                        {sizes.map((size) => (<MenuItem key={size} value={size}>
                                            {size}
                                        </MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <TextField InputProps={{ readOnly: !edit, }} size="small" required label="Color" sx={{ width: "100%" }}
                                    value={productColor}
                                    onChange={(e) => setProductColor(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={8}>
                                <TextField sx={{ width: '100%' }} size="small" label="Image Link"
                                    value={URLInput}
                                    onChange={(e) => setURLInput(e.target.value)}
                                    InputProps={{
                                        readOnly: !edit,
                                        endAdornment: (
                                            <InputAdornment position="start" >
                                                <AddOutlinedIcon
                                                    onClick={(e) => CheckURL(URLInput)} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className='buttonAndError'>
                        {/* <Button className='AddButton' onClick={EditProductToggle}> {productId ? edit ? 'Apply' : 'Update' : "Add product"}</Button> */}
                        <button onClick={EditProductToggle}>{productId ? edit ? 'Apply' : 'Update' : "Add product"}</button>
                        <span>{error}</span>
                    </div>

                </div>
                : <NotFoundPage />
            : <Loading />
    );
};

export default ProductInfo;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

//OLD 288
//NEW 