import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { shoesList, subtotal } from '../../redux/selector';
import pageSlice from '../../redux/Slice/pageSlice';
import shoesSlice from '../../redux/Slice/shoesSlice';
import EmptyCart from '../NotFound/EmptyCart';
import NotFound from '../NotFound/NotFound';
import Item from './Item';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Cart = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const ClearToggle = () => {
        dispatch(shoesSlice.actions.clearCart())
        dispatch(shoesSlice.actions.AddToLocalStorage())
        handleClose();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    useEffect(() => {
        dispatch(pageSlice.actions.TabsChange(3));
    }, [dispatch])

    const cartLish = useSelector(shoesList).filter(item => item.cart !== 0)
    const subtotalCost = useSelector(subtotal)
    return (

        <div className='Cart'>
            {
                cartLish.length === 0
                    ? <EmptyCart />
                    : <Container>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Item</th>
                                    <th >Price</th>
                                    <th >Quantity</th>
                                    <th >Subtotal</th>
                                </tr>
                                {cartLish.map(item => {
                                    return <Item key={item._id} item={item} />
                                })}

                            </tbody>
                        </table>
                        <div className='CartButton'>
                            <Link to='/product'>
                                <button>Continue shopping </button>
                            </Link>
                            <button onClick={handleClickOpen}>Clear cart</button>
                        </div>
                        <div className='Pay'>
                            <div className='PayContainer'>
                                <div >
                                    <span>Subtotal:</span>
                                    <span>${subtotalCost.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span>Shipping Fee :</span>
                                    <span>$1.69</span>
                                </div>
                                <hr />
                                <div>
                                    <span>Order Total :</span>
                                    <span>${(subtotalCost + 1.69).toFixed(2)}</span>
                                </div>
                            </div>
                            <Link to='/payment'>
                                <button>PAY NOW</button>
                            </Link>
                        </div>
                    </Container>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Remove All?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove all the items in the cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={ClearToggle} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Cart;    