import axios from "axios";

export const CreateFeedback = async (payload) => {
    const url = 'https://kstore-api.vercel.app/feedbacks/'


    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: payload,
        });
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getAllFeedback = async (payload) => {
    const url = 'https://kstore-api.vercel.app/feedbacks/all'


    try {
        const response = await axios({
            method: 'get',
            url: url,
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const GetFeedbacks = async (payload) => {
    const url = 'https://kstore-api.vercel.app/feedbacks/'

    const filter = {
        isRead: payload.isRead,
        status: payload.status,
        page: payload.page,
        pageSize: payload.pageSize,
    }
    try {
        const response = await axios({
            method: 'get',
            url: url,
            params: filter,
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const UpdateIsRead = async (payload) => {
    const url = 'https://kstore-api.vercel.app/feedbacks/isRead'
    const token = localStorage.getItem("token")
    const header = `token: Bearer ${token}`;
    const response = await axios({
        method: 'post',
        url: url,
        data: payload,
        headers: header,

    });
    return response.data

}

