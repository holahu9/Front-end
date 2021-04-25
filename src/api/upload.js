import axios from './axios';
export const uploadImage = (data) => {
    let formData = new FormData();
    formData.append('image', data)
    return axios({
        method: "POST",
        url: "/upload",
        data: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    })
}