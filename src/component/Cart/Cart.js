import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { shoesList, subtotal } from '../../redux/selector';
import pageSlice from '../../redux/Slice/pageSlice';
import shoesSlice from '../../redux/Slice/shoesSlice';
import EmptyCart from '../NotFound/EmptyCart';
import NotFound from '../NotFound/NotFound';
import Item from './Item';


const Cart = () => {


    const dispatch = useDispatch();
    const ClearToggle = () => {
        dispatch(shoesSlice.actions.clearCart())
        dispatch(shoesSlice.actions.AddToLocalStorage())
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
                                    return <Item key={item.id} item={item} />
                                })}

                            </tbody>
                        </table>
                        <div className='CartButton'>
                            <Link to='/product'>
                                <button>Continue shopping </button>
                            </Link>
                            <button onClick={ClearToggle}>Clear cart</button>
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

        </div>
    );
};

export default Cart;    