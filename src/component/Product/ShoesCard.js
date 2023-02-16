import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import StartRate from "./StartRate";
import 'react-loading-skeleton/dist/skeleton.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cartSlice from '../../redux/Slice/pageSlice';
import shoesSlice from '../../redux/Slice/shoesSlice';


const ShoesCard = ({ item }) => {
    const dispatch = useDispatch();
    const AddSuccess = () => {
        toast.success("Item added to cart!")
        dispatch(shoesSlice.actions.AddItem(item))
        dispatch(shoesSlice.actions.AddToLocalStorage())
    }
    const ToggleButton = () => {
        AddSuccess();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }
    const CartToggle = () => {
        // console.log("Card Toggle")
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }
    // <Link to={`/products/${product.id}`}
    return (
        <div className="Card" key={item.id} >
            <Link to={`/product/${item.id}`}>
                <img src={item.imageUrl} onClick={CartToggle} />
            </Link>

            <div className="Card_Info">
                <Link to={`/product/${item.id}`}>
                    <p className="Card_Name" onClick={CartToggle}><span>{item.name}</span></p>
                </Link>
                <StartRate Rate={item.rate} />
                <div className="Card_Sale">
                    <span>${item.price}</span>
                    <span><b>-</b>{item.sale}%</span>
                </div>
                <p className="Card_Price">${(item.price * (1 - item.sale / 100)).toFixed(2)}</p>
                <div className="Card_Button">
                    <button onClick={AddSuccess}>Add to cart</button>
                    <Link to="/cart">
                        <div>
                            <AiOutlineShoppingCart onClick={ToggleButton} />
                            {item.cart !== 0 && <span>{item.cart}</span>}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShoesCard;