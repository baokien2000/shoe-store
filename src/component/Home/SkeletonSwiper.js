import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonCard from './SkeletonCard';
const SkeletonSwiper = () => {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={20}
            // slidesPerView={sliceView}
            breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 5 }, // when window width is >= 640px
                450: { slidesPerView: 2, spaceBetween: 20 }, // when window width is >= 768px
                1023: { slidesPerView: 3 }, // when window width is >= 768px
                1223: { slidesPerView: 4 }, // when window width is >= 768px
                1623: { slidesPerView: 5 }, // when window width is >= 768px
            }}
        >
            <SwiperSlide><SkeletonCard /></SwiperSlide>
            <SwiperSlide><SkeletonCard /></SwiperSlide>
            <SwiperSlide><SkeletonCard /></SwiperSlide>
            <SwiperSlide><SkeletonCard /></SwiperSlide>
            <SwiperSlide><SkeletonCard /></SwiperSlide>
            <SwiperSlide><SkeletonCard /></SwiperSlide>
        </Swiper>
    );
};

export default SkeletonSwiper;