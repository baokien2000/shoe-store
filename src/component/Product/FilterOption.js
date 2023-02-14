import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const FilterOption = ({ name, data, Seleted }) => {
    const [OptionOpen, setOptionOpen] = useState(false)

    const OpenToggle = () => {
        setOptionOpen(!OptionOpen)
    }
    const OptionToggle = (e) => {
        Seleted(e.target.innerText)
        setOptionOpen(!OptionOpen)
    }
    return (
        <div className='FilterOption'>
            <button onClick={OpenToggle}>
                {name}
                {OptionOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </button>
            {OptionOpen &&
                <div>
                    {data.map((item, index) => <p onClick={OptionToggle} key={index}>{item}</p>)}
                </div>
            }
        </div>
    );
};

export default FilterOption;