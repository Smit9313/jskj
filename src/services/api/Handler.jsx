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

export function getSingleProduct(data){
    return axiosClient.get(`/products/${data.id}`, data)
}

export function addCart(data){
    const config ={
        headers: {
            Authorization: localStorage.getItem('Atoken'),
            'accept-language': 'en',
        }
    }
    return axiosClient.post("/cart/add", data, config)
    
}
