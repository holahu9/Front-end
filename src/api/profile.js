import axios from './axios';
export const createProfile = (name,
    phone,
    image,
    salon_name,
    website, token) => {
    return axios.post("/profile/create-profile", {
        name,
        phone,
        image,
        salon_name,
        website
    }, {
        headers: {
            'token': token
        }
    })
}
export const getProfile = (id) => {
    return axios.get(`/profile/get-profile/${id}`)
}
export const getListProfile = () => {
    return axios.get('/profile/list-profile')
}
export const getIsCreateprofile = (token) => {
    return axios.get('/profile/get-profile', {
        headers: {
            'token': token
        }
    })
}
export const postUpdateProfile = (id,
    name,
    phone,
    image,
    salon_name,
    token) => {
    return axios.post('/profile/update-profile', {
        id,
        name,
        phone,
        image,
        salon_name
    }, {
        headers: {
            'token': token
        }
    })
}