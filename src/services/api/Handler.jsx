import { axiosClient } from "./Client";

export function userRegister(data){
    return axiosClient.post("/auth/register",data)
}

export function userLogin(data){
    return axiosClient.post("/auth/login",data)
}

export function getProduct(data){
    // return axiosClient.get('/products',data)
    return axiosClient.get(`/products?page=${data.page+1}&productsPerPage=${data.rowsPerPage}&search=${data.search}`, data);
}
