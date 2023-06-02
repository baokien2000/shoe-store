import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { shoesList } from '../../redux/selector';
import shoesSlice from '../../redux/Slice/shoesSlice';
import StartRate from './StartRate';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import NotFoundPage from '../NotFound/NotFoundPage';
import pageSlice from '../../redux/Slice/pageSlice';
import { useEffect } from 'react';

const ShoesDetails = () => {


    const productId = useParams().productId;
    const product = useSelector(shoesList).find(item => item._id === productId)
    const [shoeCount, setShoeCount] = useState(1)
    const ButtonStyle = (btn) => {
        if (btn === "Minus") {
            return shoeCount === 1
                ? { color: '#d8d8d8' }
                : { colot: '#4dbde5' }
        }
        return shoeCount === 99
            ? { color: '#d8d8d8' }
            : { colot: '#4dbde5' }
    }
    const dispatch = useDispatch();
    const TogglePlus = () => {
        setShoeCount(shoeCount + 1)
        if (shoeCount < 99) {
            setShoeCount(shoeCount + 1)
        }
    }
    const ToggleMinus = () => {
        if (shoeCount > 1) {
            setShoeCount(shoeCount - 1)
        }
    }
    const ToggleAdd = () => {
        toast.success("Item added to cart!")
        dispatch(shoesSlice.actions.AddInItemDetails([product, shoeCount]))
        dispatch(shoesSlice.actions.AddToLocalStorage())

    }
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(pageSlice.actions.setHideNavBar(false))
    }, [])
    return product ? (
        <div className='ShoeDetails'>

            <Container>

                <button onClick={() => navigate(-1)}>Back</button>
                <div>
                    <img src={product.imageUrl} />
                    <div className="Shoe_Info">
                        <h2 className="Shoe_Name">{product.name}</h2>
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit est corrupti tenetur assumenda, totam cum eum perspiciatis quas, architecto modi aut ratione culpa! Et nesciunt nisi aliquam consequuntur unde Tenetur.</span>

                        <StartRate Rate={product.rate} />
                        <div className="Shoe_Sale">
                            <span>${product.price}</span>
                            <span className="Shoe_Price">${(product.price * (1 - product.sale / 100)).toFixed(2)}</span>
                        </div>
                        <div className='Shoe_Num'>
                            <FiMinusSquare style={ButtonStyle("Minus")} onClick={ToggleMinus} />
                            <span>{shoeCount}</span>
                            <FiPlusSquare style={ButtonStyle("Plus ")} onClick={TogglePlus} />
                        </div>
                        <button className="Shoe_Button" onClick={ToggleAdd}>Add to cart</button>
                    </div>
                </div>


            </Container>
        </div>
    ) : <NotFoundPage />;
};

export default ShoesDetails;