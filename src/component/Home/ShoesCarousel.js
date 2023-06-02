import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "react-bootstrap/Container";
import ShoesCard from "../Product/ShoesCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import pageSlice from "../../redux/Slice/pageSlice";
import { style } from "@mui/system/Stack/createStack";
import { IoMdArrowDropright } from "react-icons/io";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Skeleton from "react-loading-skeleton";
import { shoesStatus } from "../../redux/selector";
import SkeletonSwiper from "./SkeletonSwiper";

const ShoesCarousel = ({ ShoeData, Title }) => {
    // const [sliceView, setSliceView] = useState(1);
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
    const dispatch = useDispatch();

    const ToggleButton = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
        dispatch(pageSlice.actions.TabsChange(1));
    };
    // console.log(window.innerWidth)
    // useEffect(() => {
    //     console.log(SliceNum);
    // })
    // const SliceNum = ;
    // const sliceView = (window.innerWidth < 425 ? 1 : 4);
    const isLoading = useSelector(shoesStatus);
    return (
        <Container>
            <div className="ShoesCarousel">
                <div className="Title">
                    <h2>{Title}</h2>
                    <Link to="/product">
                        <button className="SeeMore_button" onClick={ToggleButton}>
                            See More
                        </button>
                    </Link>
                </div>

                {isLoading === 'idle'
                    ? <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={20}
                        // slidesPerView={sliceView}
                        navigation={{ clickable: true }}
                        loop={true}
                        speed={500}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            0: { slidesPerView: 2, spaceBetween: 5 }, // when window width is >= 640px
                            450: { slidesPerView: 2, spaceBetween: 20 }, // when window width is >= 768px
                            1023: { slidesPerView: 3 }, // when window width is >= 768px
                            1223: { slidesPerView: 4 }, // when window width is >= 768px
                            1623: { slidesPerView: 5 }, // when window width is >= 768px
                        }}
                    >
                        {ShoeData.map((item) => (
                            <SwiperSlide key={item._id}>
                                <ShoesCard item={item} />
                            </SwiperSlide>))
                        }
                    </Swiper>
                    : <SkeletonSwiper />
                }
            </div>
        </Container>
    );
};

export default ShoesCarousel;
