import { axiosClient } from "./Client";

const config = {
    headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type':'application/json',
        'accept-language': 'en',
    },
}

export function userRegister(data){
    return axiosClient.post("/auth/register",data)
}

export function userLogin(data){
    return axiosClient.post("/auth/login",data)
}

export function getUser(data) {
    return axiosClient.get("/users/get-user", data, config);
  }

export function getProduct(data){
    return axiosClient.get(`/products?page=${data.page+1}&productsPerPage=${data.rowsPerPage}&search=${data.search}`, data);
}

export function getSingleProduct(data){
    return axiosClient.get(`/products/${data.id}`, data)
}

export function addCart(data){
    return axiosClient.post("/cart/add", data, config) 
}

export function getCart(data){
    return axiosClient.get("/cart", data, config)
}

export function removeCart (data){
	return axiosClient.post('/cart/remove',data , config)
}

export function updateCart (data){
	return axiosClient.patch('/cart/update', data, config)
}

export function removeAllCart (data){
	return axiosClient.delete('/cart/removeAll',data, config)
}

export function orderPlace (data) {
    return axiosClient.post('/orders/place',data,config)
}

export function getOrder (data){
    return axiosClient.get('/orders/history',data,config)
}

export function getOrderCount (data){
    return axiosClient.get('/orders/count',data,config)
}
