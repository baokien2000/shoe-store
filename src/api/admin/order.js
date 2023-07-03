import axios from "axios";

export const AddOrder = async (payload) => {
    const url = 'https://kstore-api.cyclic.app/orders/add'
    // const token = localStorage.getItem("token")
    // const header = `token: Bearer ${token}`;
    // headers: header,

    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: payload,
            // headers: header,
        });
    } catch (error) {
        console.log(error)
    }
}