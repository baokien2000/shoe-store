const SHOE_DATA = [
    {
        id: 30,
        brand: 'Puma',
        name: "Cali Women's Sneakers",
        imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/369155/04/sv01/fnd/PNA/fmt/png',
        price: 105.25,
        sale: 10,
        rate: 4.9,
        color: 'White',
        size: [36, 37, 39, 40, 42],
        cart: 0
    },
    {
        id: 2,
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
        id: 19,
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
        id: 14,
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
        id: 8,
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
        id: 28,
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
        id: 5,
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
        id: 18,
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
        id: 12,
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
        id: 9,
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
        id: 13,
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
        id: 3,
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
        id: 17,
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
        id: 10,
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
        id: 11,
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
        id: 1,
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
        id: 20,
        brand: "Sneakers",
        name: "Cali Women's Sneakers Hazy Rose",
        imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/369155/04/sv01/fnd/PNA/fmt/png',
        price: 74.15,
        sale: null,
        rate: 4.9,
        color: 'White',
        size: [39, 40, 41],
        cart: 0

    },
    {
        id: 29,
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
        id: 23,
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
        id: 6,
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
        id: 16,
        brand: 'Puma',
        name: "Cali Women's Sneakers Wonder Mauve",
        imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/369155/13/sv01/fnd/PNA/fmt/png',
        price: 62.15,
        sale: null,
        rate: 4.2,
        color: 'White',
        size: [37, 38, 39, 40, 41],
        cart: 0

    },
    {
        id: 27,
        brand: 'Puma',
        name: "Slipstream Lo Retro Men's Sneakers",
        imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/384692/02/sv01/fnd/PNA/fmt/png',
        price: 76.77,
        sale: 19,
        rate: 4.6,
        color: 'White',
        size: [37, 38, 39, 40, 41],
        cart: 0

    },
    {
        id: 7,
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
        id: 21,
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
        id: 24,
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
        id: 25,
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
        id: 32,
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
        id: 15,
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



    // Các obj trên đã được đảo thứ tự
    // Xong Trang 3 
]

export default SHOE_DATA;