import { axiosClient } from "./Client";

export function userRegister(data){
    return axiosClient.post("/auth/register",data)
}

export function userLogin(data){
    return axiosClient.post("/auth/login",data)
}

export function getProduct(){
    return axiosClient.get('/products')
}
