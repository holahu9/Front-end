import axios from './axios';
export const createReview = (profile, star, comment,token) => {

    return axios.post("reviews/create-review", {
        profile,
        star,
        comment
    }, {
        headers: {
            'token': token
        }
    })
}
export const getReviews = (profile) => {
    return axios.post('reviews/list-review', {
        profile
    })
}
export const getReviewsOfUser = (profile,token) => {
    return axios.post('reviews/review-of-user', {
        profile
    }, {
        headers: {
            'token': token
        }
    })
}