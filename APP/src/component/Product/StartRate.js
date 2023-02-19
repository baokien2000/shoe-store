import React from 'react';
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const StartRate = ({ Rate }) => {
    const ItemStart = (Rate) => {
        const Start = []
        for (let i = 0; i < Rate; i++) {
            if (i < Math.floor(Rate)) {
                Start.push(<BsStarFill key={i} />)
            } else {
                if ((Rate % 1) < 0.3) {
                    return Start;
                } else {
                    if ((Rate % 1) < 0.8) {
                        Start.push(<BsStarHalf key={i} />)
                    } else {
                        Start.push(<BsStarFill key={i} />)
                    }
                }
            }
        }
        return Start;

    }
    return (
        <div className='Card_Rate'>
            {ItemStart(Rate)}
            <span>{Rate} star</span>
        </div>
    );
};

export default StartRate;