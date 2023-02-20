import React, { useState } from "react";
import { Container } from "react-bootstrap";
import FilterOption from "./FilterOption";
import { BiSortUp, BiSortDown } from "react-icons/bi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import filterSlice from "../../redux/Slice/filterSlice";
import pageSlice from "../../redux/Slice/pageSlice";

const Filter = () => {
    //hook
    const [seletedBrand, setSeletedBrand] = useState("All");
    const [seletedColor, setSeletedColor] = useState("All");
    const [seletedSize, setSeletedSize] = useState("All");

    const [search, setSearch] = useState("");

    const [sortOpen, setSortOpen] = useState(false);
    const [seletedSort, setSeletedSort] = useState('price');

    const [ASC, setASC] = useState(true)
    //Data
    const BrandList = ["All", "Converse", "Nike", "Adidas", "MLB", "Vans", "Puma"];
    const ColorList = ["All", "Yellow", "White", "Black", "Green", "Dard Blue", "Red"];
    const SizeList = ["All", 36, 37, 38, 39, 40, 41, 42];

    //event
    const dispatch = useDispatch();

    const ClearToggle = () => {
        setSeletedBrand("All");
        setSeletedColor("All");
        setSeletedSize("All");
        setSearch('')
        dispatch(filterSlice.actions.brandFilterChange("All"))
        dispatch(filterSlice.actions.colorFilterChange("All"))
        dispatch(filterSlice.actions.sizeFilterChange("All"))
        dispatch(filterSlice.actions.searchFilterChange(""))
    };


    const sortOpenToggle = () => {
        setSortOpen(!sortOpen)

    }
    const sortToggle = (e) => {
        setSortOpen(!sortOpen)
        setSeletedSort(e.target.innerText)
        dispatch(filterSlice.actions.sortFilterChange(e.target.innerText))
    }
    const SortASCToggle = () => {
        setASC(!ASC)
        dispatch(filterSlice.actions.ascFilterChange(!ASC))

    }
    const HandleSearchChange = (e) => {
        setSearch(e.target.value)
        dispatch(filterSlice.actions.searchFilterChange(e.target.value))
        dispatch(pageSlice.actions.PagesChange(1))
    }

    const handleBrandChange = (value) => {
        setSeletedBrand(value)
        dispatch(filterSlice.actions.brandFilterChange(value))
        dispatch(pageSlice.actions.PagesChange(1))
    }
    const handleColorChange = (value) => {
        setSeletedColor(value)
        dispatch(filterSlice.actions.colorFilterChange(value))
        dispatch(pageSlice.actions.PagesChange(1))
    }
    const handleSizeChange = (value) => {
        setSeletedSize(value)
        dispatch(filterSlice.actions.sizeFilterChange(value !== "All" ? parseInt(value) : value))
        dispatch(pageSlice.actions.PagesChange(1))
    }
    return (
        <div className="Filter">
            <Container>
                <p>Filter</p>
                <div className="FilterSeach">
                    <FilterOption name={"Brand"} data={BrandList} Seleted={handleBrandChange} />
                    <FilterOption name={"Color"} data={ColorList} Seleted={handleColorChange} />
                    <FilterOption name={"Size"} data={SizeList} Seleted={handleSizeChange} />
                    <input placeholder="Search" value={search} onChange={HandleSearchChange} />
                </div>

                <div className="CategoriesSort">
                    <div className="Categories">
                        <p>Categories:</p>
                        <span> Brand: <b>{seletedBrand}</b> </span>
                        <span> Color: <b>{seletedColor}</b> </span>
                        <span> Size:  <b>{seletedSize} </b> </span>
                        <span onClick={ClearToggle}>Clear filter</span>
                    </div>
                    <div className="Sort">
                        <p>Sort by:</p>
                        <div className='SortOption'>
                            <button onClick={sortOpenToggle}>
                                {seletedSort} {sortOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                            </button>
                            {sortOpen &&
                                <div>
                                    <p onClick={sortToggle}>price</p>
                                    <p onClick={sortToggle}>sale</p>
                                    <p onClick={sortToggle}>rate</p>
                                </div>
                            }
                        </div>

                        {ASC ? <BiSortUp onClick={SortASCToggle} /> : <BiSortDown onClick={SortASCToggle} />}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Filter;
