import { createSelector } from "@reduxjs/toolkit";

export const filterSearch = (state) => state.filter.search;
export const filterBrand = (state) => state.filter.brand;
export const filterColor = (state) => state.filter.color;
export const filterSize = (state) => state.filter.size;
export const filterSort = (state) => state.filter.sort;
export const filterASC = (state) => state.filter.ASC;

export const shoesList = (state) => state.shoes;

export const CurrentTabs = (state) => state.page.NavBarTabs;
export const CurrentPages = (state) => state.page.ProductPages;

export const shippingDetails = (state) => state.shipping;
// Filter

export const filterShoes = createSelector(
    shoesList, filterSearch, filterBrand, filterColor, filterSize, filterSort, filterASC,
    (shoes, search, brand, color, size, sort, asc) => {
        let fill = shoes.filter(shoe => shoe.name.includes(search));
        fill = brand === "All" ? fill : fill.filter(shoe => shoe.brand === brand)
        fill = color === "All" ? fill : fill.filter(shoe => shoe.color === color)
        fill = size === "All" ? fill : fill.filter(shoe => shoe.size.includes(size))
        fill = sort === "rate"
            ? fill.sort((a, b) => a.rate > b.rate ? 1 : -1)
            : sort === "price"
                ? fill.sort((a, b) => a.price > b.price ? 1 : -1)
                : fill.sort((a, b) => a.sale > b.sale ? 1 : -1)
        fill = asc === true ? fill : fill.reverse()

        return fill;
    }
)
// Shoe


export const shoesHome = createSelector(shoesList, (card) => {
    return card;
})



// Cart

export const subtotal = createSelector(shoesList, (cart) => {
    let price = 0
    cart.forEach(item => {
        if (item.cart !== 0) {
            price += (item.price * item.cart)
        }
    })
    return price
})

