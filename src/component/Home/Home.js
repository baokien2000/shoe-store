import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Shoe from "../../data/shoe";
import HeaderVideo from "./HeaderVideo";
import ShoesBanner from "./ShoesBanner";
import ShoesCarousel from "./ShoesCarousel";
import AdidasBannerShoes from '../../images/Shoes/Adidas.png';
import NikeBannerShoes from '../../images/Shoes/Nike.png';
import { useDispatch, useSelector } from "react-redux";
import shoesSlice from "../../redux/Slice/shoesSlice";
import { filterShoes, shoesHome, shoesList, shoesStatus } from "../../redux/selector";
import pageSlice from "../../redux/Slice/pageSlice";

const Home = () => {
    let Filltershoes = useSelector(shoesHome);

    const [TrendingShoeData, setTrendingShoeData] = useState([]);
    const [SuperDiscountData, setSuperDiscountData] = useState([]);
    const [NewProdutsData, setNewProdutsData] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const TrendingShoes = [...Filltershoes].sort((a, b) => b.rate - a.rate);
        const SuperDiscountShoes = [...Filltershoes].sort((a, b) => (a.sale > b.sale ? -1 : 1));

        setTrendingShoeData(TrendingShoes.slice(0, 10));
        setSuperDiscountData(SuperDiscountShoes.slice(0, 10))
        setNewProdutsData([...Filltershoes].slice(Filltershoes.length - 10, Filltershoes.length))

        dispatch(pageSlice.actions.TabsChange(0))
    }, [Filltershoes]);

    useEffect(() => {
        dispatch(pageSlice.actions.setHideNavBar(false))
    }, [])
    const Banner_Info = {
        Bannner1: {
            Header: "HIGHLIGHTS",
            Title: "ADIDAS WITH LIMITLESS CHOICES",
            Text: "Our Purpose is to move the world forward. We take action by building community, protecting our planet and increasing access to sport.",
            IsImageLeft: true,
            ImageSrc: AdidasBannerShoes,
        },
        Bannner2: {
            Header: "FEATURED",
            Title: "NIKE SNEAKERS AIR LANCING SHOES",
            Text: "The radiance lives on Nike Sneakers Air Lancing Shoes, the basket ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
            IsImageLeft: false,
            ImageSrc: NikeBannerShoes,
        },
    }

    return (

        <div className="HomePage">
            <HeaderVideo />
            <ShoesCarousel Title={"New Products"} ShoeData={NewProdutsData} />
            <ShoesBanner Banner_Info={Banner_Info.Bannner1} />
            <ShoesCarousel Title={"Best Seller"} ShoeData={TrendingShoeData} />
            <ShoesBanner Banner_Info={Banner_Info.Bannner2} />
            <ShoesCarousel Title={"Super Discount"} ShoeData={SuperDiscountData} />
        </div>
    );
};

export default Home;
