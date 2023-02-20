const SHOE_DATA = [
    {
        brand: 'Vans',
        name: 'Vans Authentic DIY HC Lemon Chrome',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/vn0a4uuc1ae-4.jpg',
        price: 6.31,
        sale: 17,
        rate: 5,
        color: 'Yellow',
        size: [36, 37, 38, 40, 41],
        cart: 0

    },

    {

        brand: 'MLB',
        name: 'MLB Boston',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202202/112a3f768e52661d422c24282bba4413.jpg',
        price: 72.88,
        sale: 12,
        rate: 4.0,
        color: 'White',
        size: [37, 38, 39],
        cart: 0

    },
    {

        brand: 'Converse',
        name: 'Converse Chuck Taylor All Star 1970s Sunflower - Hi',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/162054-4.png',
        price: 55.02,
        sale: 15,
        rate: 4.6,
        color: 'Yellow',
        size: [36, 38, 39, 40],
        cart: 0

    },
    {
        brand: 'MLB',
        name: 'MLB Bigball Chunky Mono Heel',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202201/d8fbdfb120169168ada3de1d8993db18.jpg',
        price: 38.97,
        sale: 20,
        rate: 4.7,
        color: 'White',
        size: [36, 37, 38, 39, 42],
        cart: 0

    },
    {

        brand: 'Vans',
        name: 'Vans Old Skool All Black',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/vn000d3hbka-5.jpg',
        price: 99.99,
        sale: 25,
        rate: 4.8,
        color: 'Black',
        size: [37, 38, 39, 41, 42],
        cart: 0

    },
    {
        brand: 'MLB',
        name: 'MLB Playball Mule Dia Monogram',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202112/58c2645bdc72e51726c57e29e954d156.jpg',
        price: 32.20,
        sale: 24,
        rate: 4.3,
        color: 'White',
        size: [36, 38, 39, 40],
        cart: 0

    },

    {

        brand: 'Vans',
        name: 'Vans Old Skool Off The Wall Sidewall True Navy',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/vn0a38g1vri-5.png',
        price: 74.44,
        sale: 10,
        rate: 5,
        color: 'Blue',
        size: [36, 37, 38, 40],
        cart: 0

    },
    {

        brand: 'Converse',
        name: 'Converse Chuck 70 Archive Paint Splatter',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/170802c-3.jpg',
        price: 52.53,
        sale: 17,
        rate: 4.2,
        color: 'White',
        size: [36, 37, 38, 39, 40],
        cart: 0

    },
    {
        brand: 'MLB',
        name: 'MLB Bigball Chunky Lite Grey',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202108/281615eadbbbccdf68745b6fa21e9605.jpg',
        price: 44.06,
        sale: 15,
        rate: 4.8,
        color: 'White',
        size: [36, 39, 41],
        cart: 0

    },
    {

        brand: 'Vans',
        name: 'Vans Old Skool Black White',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/45454.png',
        price: 49.99,
        sale: 15,
        rate: 4.9,
        color: 'Black',
        size: [36, 37, 38, 39, 41],
        cart: 0

    },
    {
        brand: 'Vans',
        name: 'Vans Old Skool Pro Black White',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/vn000zd4y28-1.jpg',
        price: 8.85,
        sale: null,
        rate: 4.7,
        color: 'Black',
        size: [36, 37, 38, 39, 40],
        cart: 0

    },
    {

        brand: 'MLB',
        name: 'MLB Chunky Liner New York',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202201/51afbaf684e362b016942e7baf9bb9d6.jpg',
        price: 67.77,
        sale: 5,
        rate: 4.8,
        color: 'White',
        size: [36, 37, 38, 40],
        cart: 0

    },
    {

        brand: 'Sneaker',
        name: 'Sneaker Adidas Supercourt Cloud White',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/413/756/products/30010004064047251357-1-1658736780431.jpg?v=1658736786620',
        price: 48.29,
        sale: 12,
        rate: 4.7,
        color: 'White',
        size: [36, 39, 38, 41],
        cart: 0

    },
    {

        brand: 'Puma',
        name: "Cali Women's Sneakers Karlie Kloss",
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/413/756/products/30010004064047251357-1-1658736780431.jpg?v=1658736786620',
        price: 50.84,
        sale: 10,
        rate: 4.5,
        color: 'White',
        size: [36, 37, 38, 39],
        cart: 0

    },

    {
        brand: 'Converse',
        name: 'Converse Chuck Taylor All Star Classic',
        imageUrl: 'https://product.hstatic.net/200000265619/product/d4ddf079f419dd539b7492a8ac84fd1e_9a82b5ad2072416abd6482e8423b57d7_1024x1024.jpg',
        price: 5.08,
        sale: 20,
        rate: 5,
        color: 'Yellow',
        size: [36, 37, 39, 40],
        cart: 0

    },

    {

        brand: 'Converse',
        name: 'Converse Chuck Taylor All Star 1970s Enamel Red - Hi',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/164944-4.png',
        price: 101.76,
        sale: 20,
        rate: 4.5,
        color: 'Red',
        size: [36, 37, 39, 40, 42],
        cart: 0

    },

    {

        brand: 'MLB',
        name: 'MLB Bigball Chunky Lite Cream Black',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202107/a035b1fab93a75e6c68565f120c3165f.jpg',
        price: 46.5,
        sale: 10,
        rate: 4.3,
        color: 'White',
        size: [36, 37, 42],
        cart: 0

    },
    {
        brand: 'MLB',
        name: 'MLB NY Vintage Hazy Rose',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202201/22577ddf36f37ff6b96f7b8aabb01077.jpg',
        price: 35.59,
        sale: 20,
        rate: 4.3,
        color: 'White',
        size: [37, 39, 40, 41],
        cart: 0

    },



    {
        brand: 'MLB',
        name: 'MLB Playball Mule Dia Monogram',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202108/b017bc7c2cee3897f73da272fffecc82.jpg',
        price: 37.11,
        sale: 27,
        rate: 4.3,
        color: 'White',
        size: [37, 38, 39, 40, 42],
        cart: 0

    },

    {

        brand: 'MLB',
        name: 'MLB NY Chunky High Shoes',
        imageUrl: 'https://en.mlb-korea.com/web/product/big/202201/4307ec6b8a11a1fe4d1bb4865f042fd3.jpg',
        price: 74.14,
        sale: 17,
        rate: 4.5,
        color: 'White',
        size: [37, 38, 39, 40, 41, 42],
        cart: 0

    },

    {

        brand: 'Adidas',
        name: 'sneaker Adidas X9000 Karlie Kloss',
        imageUrl: 'https://bizweb.dktcdn.net/100/413/756/products/44f529a3-8697-4ddb-b571-3f4ea9f2f262.jpg?v=1652600779927',
        price: 74.99,
        sale: 25,
        rate: 4.4,
        color: 'White',
        size: [37, 38, 39],
        cart: 0

    },
    {

        brand: 'Converse',
        name: 'Converse Chuck Taylor All Star Classic',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/168746c-1.jpg',
        price: 79.99,
        sale: 8,
        rate: 4.9,
        color: 'White',
        size: [37, 39, 40, 42],
        cart: 0

    },
    {

        brand: 'Converse',
        name: "Converse Chuck Jeans All Star Classic",
        imageUrl: 'https://product.hstatic.net/200000265619/product/127440-1_3d48be2035ac4f979d85439bc069e047_1024x1024.jpg',
        price: 87,
        sale: 15,
        rate: 5,
        color: 'Black',
        size: [36, 38, 39, 40, 42],
        cart: 0

    },
    {

        brand: 'Vans',
        name: 'Vans Check Bess NI Shoes',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/vn0a4btht80-7.jpg',
        price: 63.55,
        sale: 18,
        rate: 4.4,
        color: 'White',
        size: [36, 38, 39, 40],
        cart: 0

    },
    {

        brand: 'Nike',
        name: 'Nike Air Max Dawn',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c6cf6d50-ebfb-49ca-aba2-109282f8f15d/air-max-dawn-shoe-VbDN84.png',
        price: 100.55,
        sale: 10,
        rate: 4.9,
        color: 'Dark Blue',
        size: [36, 38, 39, 40, 41, 42],
        cart: 0

    },
    {

        brand: 'Nike',
        name: 'Air Jordan 1 Mid SE',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bb432a15-ec12-4476-b8a8-1c7a2b79e902/air-jordan-1-mid-se-shoes-SXFQqx.png',
        price: 100.55,
        sale: 5,
        rate: 4.9,
        color: 'Dark Blue',
        size: [38, 39, 40, 41, 42],
        cart: 0
    },
    {

        brand: 'Nike',
        name: 'Nike Blazer Mid Pro Club',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3882dca8-76f9-4bb9-b78e-a5bf8e4d72fb/blazer-mid-pro-club-shoes-xCk8SQ.png',
        price: 98.55,
        sale: 12,
        rate: 4.5,
        color: 'White',
        size: [36, 38, 39, 40, 41],
        cart: 0
    },
    {

        brand: 'Nike',
        name: 'Nike Blazer Low 77',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/14ee637c-aabb-4a47-9973-58af8e1077c3/blazer-low-77-shoes-jx4bjz.png',
        price: 120.55,
        sale: 5,
        rate: 4.8,
        color: 'Green',
        size: [36, 37, 39, 40, 41, 42],
        cart: 0
    },
    {

        brand: 'Nike',
        name: 'Nike Air Max Plus SE',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6d5ed1cf-3aaa-43c1-99eb-4b6b140786e2/air-max-plus-se-shoes-LMv0R8.png',
        price: 220.99,
        sale: 5,
        rate: 5,
        color: 'White',
        size: [36, 37, 38, 39, 40, 41],
        cart: 0
    }, {

        brand: 'Nike',
        name: 'Nike Waffle One Leather',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/322e3673-cbb9-4eb4-865f-089e0a29dcda/waffle-one-leather-shoes-Dk1LWD.png',
        price: 139,
        sale: 9,
        rate: 5,
        color: 'Black',
        size: [36, 38, 39, 40, 41, 42],
        cart: 0
    }, {

        brand: 'Nike',
        name: 'Air Jordan 1 Mid',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/48f2834b-bc0a-4fd6-8513-33d3ff0e7489/air-jordan-1-mid-shoes-86f1ZW.png',
        price: 160.43,
        sale: 15,
        rate: 4.4,
        color: 'Dark Blue',
        size: [36, 37, 38, 39, 40],
        cart: 0
    },
    {

        brand: 'Nike',
        name: 'Nike SB Zoom Blazer Mid PRM',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ff63aac1-44d5-41ee-b4be-2a5ba2b6b3a4/sb-zoom-blazer-mid-prm-skate-shoes-LJH748.png',
        price: 99.99,
        sale: 10,
        rate: 4.5,
        color: 'Yellow',
        size: [36, 37, 39, 41, 42],
        cart: 0
    },
    {

        brand: 'Nike',
        name: 'Nike Dunk Low Disrupt 2',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f9c0a331-7ca3-48c3-b241-16b54e07d80d/dunk-low-disrupt-2-shoes-rmbZnK.png',
        price: 160.22,
        sale: 10,
        rate: 4.5,
        color: 'Yellow',
        size: [37, 40, 41, 42],
        cart: 0
    },
    {

        brand: 'Nike',
        name: 'Nike Zoom Mercurial Vapor 15 Academy TF',
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1c465a01-bbdc-4cfe-a5b2-5073cdd98ec7/zoom-mercurial-vapor-15-academy-tf-football-shoes-L8JgP4.png',
        price: 105.12,
        sale: 15,
        rate: 4.5,
        color: 'Yellow',
        size: [36, 37, 38, 39, 40, 41, 42],
        cart: 0
    },
    {

        brand: 'Adidas',
        name: 'Superstar Shoes',
        imageUrl: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg',
        price: 109.12,
        sale: 10,
        rate: 4.9,
        color: 'White',
        size: [36, 37, 38, 39, 40, 41, 42],
        cart: 0
    },
    // {
    //     
    //     brand: 'Adidas',
    //     name: 'Response Solar Running Shoes',
    //     imageUrl: 'https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/w/5/r/-original-imagmdbvmfenzxm2.jpeg?q=70',
    //     price: 205.12,
    //     sale: 10,
    //     rate: 4.9,
    //     color: 'White',
    //     size: [36, 37, 38, 39, 40, 41, 42],
    //     cart: 0
    // },
    // {
    //     
    //     brand: 'Adidas',
    //     name: 'CriNu Cricket Shoes',
    //     imageUrl: 'https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/u/x/b/8-gb2764-8-adidas-ftwwht-pulblu-cblack-original-imagky4jthceycgu.jpeg?q=70',
    //     price: 185.18,
    //     sale: 13,
    //     rate: 4.9,
    //     color: 'White',
    //     size: [36, 37, 38, 39, 40, 41, 42],
    //     cart: 0
    // },
    // {
    //     
    //     brand: 'Adidas',
    //     name: 'Vigilaar M Running Shoes',
    //     imageUrl: 'https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/q/v/g/-original-imagkybnkg8qea6x.jpeg?q=70',
    //     price: 147.43,
    //     sale: 5,
    //     rate: 4.9,
    //     color: 'Black',
    //     size: [36, 37, 38, 39, 40, 41, 42],
    //     cart: 0
    // },
    // {
    //     
    //     brand: 'Adidas',
    //     name: 'Adiscend M Running Shoes',
    //     imageUrl: 'https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/2/t/k/6-gb2403-6-adidas-ngtsky-ftwwht-focoli-original-imagg4aghrd324sg.jpeg?q=70',
    //     price: 175.42,
    //     sale: 15,
    //     rate: 4.5,
    //     color: 'Dark Blue',
    //     size: [36, 37, 38, 39, 40, 41, 42],
    //     cart: 0
    // },

]

export default SHOE_DATA;