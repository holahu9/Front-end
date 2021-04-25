import axios from './axios';
export const loginUser = (email,password)=>{
    return axios.post("/users/login",{
        email,
        password
    },{
        headers:{
            'Content-Type':'application/json'
        }
    })
}
export const registerUser=(email,name,password,role)=>{
    return axios.post("/users/register",{
        email,
        name,
        password,
        role
    })
}