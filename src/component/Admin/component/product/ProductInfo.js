import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useParams } from 'react-router-dom';
import { shoesHome } from '../../../../redux/selector';
import { toast } from 'react-toastify';
import NotFoundPage from '../../../NotFound/NotFoundPage';

const sizes = ['36', '37', '38', '39', '40', '41', '42']

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const ProductInfo = ({ product }) => {


    const [URLInput, setURLInput] = useState(product.imageUrl)
    const [URL, setURL] = useState(product.imageUrl)
    const [size, setSize] = useState(product.size);
    const [error, setError] = useState('')

    const [productName, setProductName] = useState(product.name)
    const [productBrand, setProductBrand] = useState(product.brand)
    const [productPrice, setProductPrice] = useState(product.price)
    const [productRate, setProductRate] = useState(product.rate)
    const [productSale, setProductSale] = useState(product.sale)
    const [productColor, setProductColor] = useState(product.color)

    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminSlice.actions.setTab("product details"))
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

    useEffect(() => {
        if (error !== '') {
            setError('')
        }
    }, [productName, productColor, productBrand, productPrice, productRate, productSale, size, URLInput])



    const EditProductToggle = async () => {
        if (!edit) {
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
        const UpdateUrl = 'http://localhost:5000/shoes/Update'
        const payload = {
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
        }

        try {
            const updateProduct = await axios({
                method: 'post',
                url: UpdateUrl,
                data: payload,
                signal: controller.signal,
            })
            toast.success("Update product success")

            isMounted && dispatch(shoesSlice.actions.updateShoes(updateProduct.data))
            setEdit(false)

            return () => {
                isMounted = false;
                controller.abort()
            }
        } catch (e) {
            console.log(e)
            toast.error("Update failed")
        }
    }

    const handleChange = (event) => {
        if (edit) {
            const { target: { value }, } = event;
            setSize(typeof value === 'string' ? value.split(',') : value);
        }
    };
    return (
        <div className='AddProduct'>
            <div className='product'>
                {ProductImage()}
                {/* <img src={product.imageUrl} alt='Product Image' /> */}

                <div className='productInfo'>
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
            </div>
            <div className='buttonAndError'>

                <button onClick={EditProductToggle}>{edit ? 'Apply' : 'Update'}</button>
                <span>{error}</span>
            </div>
        </div>
    );
};

export default ProductInfo;