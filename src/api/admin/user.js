import axios from "axios"

export const DeleteUser = (removeId) => {

    const controller = new AbortController()
    const URL = 'https://kstore-api.cyclic.app/users/Delete'

    const token = localStorage.getItem("token")
    const header = `token: Bearer ${token}`;
    const removeUser = axios({
        method: 'delete',
        url: URL,
        data: removeId,
        signal: controller.signal,
        headers: header,
    })
    return removeUser

}

