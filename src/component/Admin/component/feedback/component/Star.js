import React from 'react';
import { useId } from 'react';



export const Star = ({ offset, gray, id, size }) => {
    return (
        <svg
            className="mr-1"
            width={size ?? "13"}
            height={size ?? "13"}
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.5794 5.3537C12.5248 5.18221 12.4197 5.03116 12.2779 4.92027C12.1362 4.80938 11.9643 4.74379 11.7847 4.73206L8.53677 4.50476L7.33194 1.47089C7.26674 1.30316 7.15239 1.15904 7.00388 1.05742C6.85537 0.95579 6.67962 0.901398 6.49966 0.901367C6.31999 0.901688 6.14374 0.956218 5.99555 1.05783C5.84737 1.15944 5.73329 1.3034 5.66824 1.47089L4.44546 4.52228L1.21548 4.73206C1.03589 4.74379 0.863994 4.80938 0.722234 4.92027C0.580475 5.03116 0.47543 5.18221 0.420806 5.3537C0.363182 5.52763 0.359262 5.71487 0.409557 5.89106C0.459851 6.06724 0.562031 6.2242 0.702789 6.34149L3.18765 8.44183L2.44852 11.3492C2.39757 11.5451 2.40694 11.7517 2.4754 11.9422C2.54385 12.1326 2.66821 12.2979 2.83218 12.4165C2.9905 12.5317 3.17982 12.5965 3.3755 12.6026C3.57119 12.6087 3.76417 12.5558 3.92935 12.4507L6.49283 10.8267C6.49624 10.8242 6.49966 10.8225 6.50735 10.8267L9.26565 12.5742C9.4154 12.6698 9.59054 12.7181 9.76815 12.7126C9.94576 12.7071 10.1176 12.6481 10.2611 12.5434C10.4097 12.436 10.5224 12.2862 10.5845 12.1137C10.6465 11.9412 10.655 11.754 10.6089 11.5765L9.82364 8.40039L12.2974 6.34149C12.4382 6.2242 12.5403 6.06724 12.5906 5.89106C12.6409 5.71487 12.637 5.52763 12.5794 5.3537Z"
                fill={'url(#' + id + ')'}
            />
            <defs>
                <linearGradient
                    id={id}
                    x1="0.5"
                    y1="8.90137"
                    x2="12.5"
                    y2="8.90137"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F3BD42" />
                    <stop offset={offset} stopColor="#F3BD42" />
                    <stop offset={offset} stopColor="#C9C9C9" />
                    <stop offset={gray} stopColor="#DDDDDD" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const RenderStar = ({ rate, size }) => {
    const id = useId()

    const StarLish = []
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rate)) {
            StarLish.push(<Star key={id + i} size={size} id={id + i} gray={1} offset={1} />)
        } else {
            if (rate % 1 > 0 && Math.floor(rate) + 1 === i) {
                StarLish.push(<Star key={id + i} size={size} id={id + i} gray={1} offset={rate % 1} />)
            } else {
                StarLish.push(<Star key={id + i} size={size} id={id + i} gray={0} offset={0} />)
            }
        }
    }
    return <div className='Star'>
        {StarLish}
    </div>
}

