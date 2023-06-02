import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import adminSlice from '../../../../redux/Slice/adminSlice';
import NotFoundImage from '../../../../images/NotFoundImage.jpg'
import ErrorImgae from '../../../../images/ImageError.png'
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
import { useMemo } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const sizes = ['36', '37', '38', '39', '40', '41', '42',];




const ProductAdd = () => {
    const dispatch = useDispatch();
    const [URLInput, setURLInput] = useState('')
    const [URL, setURL] = useState('')
    const [size, setSize] = useState([]);
    const [error, setError] = useState('')

    const [productName, setProductName] = useState('')
    const [productBrand, setProductBrand] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productRate, setProductRate] = useState('')
    const [productSale, setProductSale] = useState('')
    const [productColor, setProductColor] = useState('')

    useEffect(() => {
        dispatch(adminSlice.actions.setTab("add product"))
    }, [])

    const CheckURL = (URL) => {
        const image = new Image();
        image.onload = () => { setURL(URL) }
        image.onerror = () => { setURL('error') }
        image.src = URL
    }
    const ProductImage = () => {
        if (URL === '') {
            return <img src={NotFoundImage} alt='product image' />
        }
        if (URL === 'error') {
            return <img src={ErrorImgae} alt='product image' />
        }
        return <img src={URL} alt='product image' />
    }

    const handleChange = (event) => {
        const { target: { value }, } = event;
        setSize(typeof value === 'string' ? value.split(',') : value);
    };

    const AddProductToggle = async () => {
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
        const controller = new AbortController();
        let isMounted = true
        const AddURL = 'http://localhost:5000/shoes'
        const payload = {
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
        try {
            const addProduct = await axios({
                method: 'post',
                url: AddURL,
                data: payload,
                signal: controller.signal,
            })

            toast.success("Add success")

            setProductName('')
            setProductBrand('')
            setProductColor('')
            setProductPrice('')
            setProductSale('')
            setProductRate('')
            setSize([])
            setURLInput('')
            setURL('')

            isMounted && dispatch(shoesSlice.actions.addShoes(addProduct.data))
            return () => {
                controller.abort()
                isMounted = false
            }
        } catch (e) {
            console.log(e)
            toast.error("Add product false")
        }

    }

    useEffect(() => {
        if (error !== '') {
            setError('')
        }
    }, [productName, productColor, productBrand, productPrice, productRate, productSale, size, URLInput])

    return (
        <div className='AddProduct'>
            <div className='product'>
                {ProductImage()}

                <div className='productInfo'>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField size="small" required label="Name" sx={{ width: "100%" }}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField size="small" required label="Brand" sx={{ width: "100%" }}
                                value={productBrand}
                                onChange={(e) => setProductBrand(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField size="small" type={'number'} required label="Price" sx={{ width: "100%" }}
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField size="small" type={'number'} required label="Rate" sx={{ width: "100%" }}
                                value={productRate}
                                onChange={(e) => setProductRate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField size="small" type={'number'} required label="Sale" sx={{ width: "100%" }}
                                value={productSale}
                                onChange={(e) => setProductSale(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl size='small' sx={{ width: "100%" }}  >
                                <InputLabel required >Size</InputLabel>
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
                            <TextField size="small" required label="Color" sx={{ width: "100%" }}
                                value={productColor}
                                onChange={(e) => setProductColor(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={8}>
                            <TextField sx={{ width: '100%' }} size="small" label="Image Link" value={URLInput}
                                onChange={(e) => setURLInput(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start" >
                                            <AddOutlinedIcon onClick={(e) => CheckURL(URLInput)} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className='buttonAndError'>

                <button onClick={AddProductToggle}>Add product</button>
                <span>{error}</span>
            </div>
        </div>
    );
};

export default ProductAdd;