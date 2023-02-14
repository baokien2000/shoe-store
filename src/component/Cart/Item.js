import React from 'react';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import cartSlice from '../../redux/Slice/pageSlice';
import shoesSlice from '../../redux/Slice/shoesSlice';

const Item = ({ item }) => {
    const dispatch = useDispatch();
    const RemoveToggle = () => {
        dispatch(shoesSlice.actions.removeItem(item.id))
    }
    const ButtonStyle = (btn) => {
        if (btn === "Minus") {
            return item.cart === 1
                ? { color: '#d8d8d8' }
                : { colot: '#4dbde5' }
        }
        return item.cart === 99
            ? { color: '#d8d8d8' }
            : { colot: '#4dbde5' }
    }

    const TogglePlus = () => {
        dispatch(shoesSlice.actions.AddItem(item))
    }
    const ToggleMinus = () => {
        dispatch(shoesSlice.actions.ReduceItem(item))
    }
    return (
        <tr>
            <td>
                <img src={item.imageUrl} />
                <span>{item.name}</span>
            </td>
            <td>${item.price}</td>
            <td>
                <div>
                    <FiMinusSquare style={ButtonStyle("Minus")} onClick={ToggleMinus} />
                    <span>{item.cart}</span>
                    <FiPlusSquare style={ButtonStyle("Plus ")} onClick={TogglePlus} />
                </div>
            </td>
            <td>${(item.price * item.cart).toFixed(2)}</td>
            <td><RiDeleteBinLine onClick={RemoveToggle} /></td>
        </tr>
    );
};

export default Item;