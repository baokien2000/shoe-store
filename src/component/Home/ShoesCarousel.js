import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "react-bootstrap/Container";
import ShoesCard from "../Product/ShoesCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import pageSlice from "../../redux/Slice/pageSlice";

// Import Swiper styles
const ShoesCarousel = ({ ShoeData, Title }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    const dispatch = useDispatch()



    const ToggleButton = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
        dispatch(pageSlice.actions.TabsChange(1))
    }
    return (
        <Container>

            <div className="ShoesCarousel">
                <div className="Title">
                    <h2>{Title}</h2>
                    <Link to={'/Product'}>
                        <button className="SeeMore_button" onClick={ToggleButton}>
                            See More
                        </button>
                    </Link>
                </div>
                {ShoeData.length != 0 && (
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={true}
                        responsive={responsive}
                        customTransition={'transform 800ms ease-in-out 0s'}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                    >
                        {ShoeData.map((item) => <ShoesCard item={item} key={item.id} />)}
                    </Carousel>
                )}
            </div>
        </Container>

    );
};

export default ShoesCarousel;
