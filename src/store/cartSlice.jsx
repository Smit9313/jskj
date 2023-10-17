import { createSlice } from "@reduxjs/toolkit";
import { addCart, getCart, removeAllCart, removeCart, updateCart } from "../services/api/Handler";

const initial = {
    cart:[],
    totalquantity:0,
    totalprice:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initial,
    reducers:{
       setCart(state,action){
        state.cart = action.payload
       },
       setQuantity(state,action){
        state.totalquantity=action.payload
       },
       setTotalPrice(state,action){
        state.totalprice=action.payload
       }
    }
})

export const {setCart,setQuantity,setTotalPrice} = cartSlice.actions
export default cartSlice.reducer;

export function getCartt(){
    return async function (dispatch,getState){
        getCart({}).then((res)=>{
            console.log(res)
            if(res.status){
                dispatch(setCart(res.data.cart_items))
                dispatch(setTotalPrice( res.data.total_price))
                dispatch(setQuantity(res.data.total_quantity))
            }
        })
    }
}

export function addCartt(data){
  let totalPrice;
  let totalQty;
  let cartData;
  return async function (dispatch,getState){
    // console.log(data,"data")
    // console.log(getState().cart,"only state")
    // console.log(getState().cart.product,"abcs only products")
    const result = getState().cart.cart.find((item)=>item.product_id === data.product.id)
    totalQty = getState().cart.totalquantity + data.quantity
    if(result){
        totalPrice = getState().cart.totalprice  + result.price_per_unit * data.quantity;
        cartData= getState().cart.cart.map((val) =>
        val.product_id === data.product.id
          ? { ...val, quantity: val.quantity + data.quantity }
          : val
      );
    }else{
        const product = {
            product_id: data.product.id,
            product_name: data.product.name,
            image: data.product.image,
            quantity:data.quantity,
            price_per_unit: data.product.price,
        }
        totalPrice = getState().cart.totalprice + data.product.price * data.quantity;
        cartData = [...getState().cart.cart, product];
    }
    
    const product = {
        ProductId: data.product.id,
        quantity:data.quantity
    }
    // console.log(product)
    addCart(product).then((res)=>{
        // console.log(res)
        if(res.status){
            dispatch(setCart(cartData))
            dispatch(setQuantity(totalQty))
            dispatch(setTotalPrice(totalPrice))
        }
    }).catch((err)=>{
        console.log(err)
    })
  }
}

export function removeCartt(data){
    let totalPrice;
    let totalQty;
    let cartData;

    return async function (dispatch, getState){
        console.log(data.ProductId)
        const result = getState().cart.cart.find((item)=>item.product_id === data.ProductId)
        if(result){
            console.log(result)
            console.log(getState().cart.totalquantity)
            totalQty = getState().cart.totalquantity - result.quantity
            console.log(totalQty)
            cartData = getState().cart.cart.filter((item)=>item.product_id !== data.ProductId)
            console.log(cartData)
        }
      
        console.log(data)
        removeCart(data).then((res)=>{
            console.log(res)
            if(res.status){
                dispatch(setCart(cartData))
                dispatch(setQuantity(totalQty))
                dispatch(setTotalPrice(totalPrice))
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export function updateCartt(data){
    let totalPrice;
    let totalQty;
    let cartData;

    return async function (dispatch,getState){
        console.log(data,"data")
        const result = getState().cart.cart.find(
            (item)=>item.product_id === data.ProductId
        )

        if(result){
            if(data.quantity > 0){
                if(result.quantity > data.quantity){
                    totalQty = getState().cart.totalquantity - 1;
                    totalPrice = getState().cart.totalprice - result.price_per_unit
                }else {
                    totalQty = getState().cart.totalquantity + 1;
                    totalPrice = getState().cart.totalprice + result.price_per_unit
                }
                cartData = getState().cart.cart.map((item)=>{
                if(item.product_id === data.ProductId){
                   return {...item, quantity: data.quantity}
                }else{
                    return item
                }
            })
           }
        }

        if(data.quantity > 0){
            updateCart(data).then((res)=>{
                if(res.status){
                    dispatch (setCart(cartData))
                    dispatch(setQuantity(totalQty))
                    dispatch(setTotalPrice(totalPrice))
                }
            })
        }
    }
}

export function removeAllCartt(){
    return async function (dispatch,getState){
        removeAllCart({}).then((res)=>{
            console.log(res)
            if(res.status){
                dispatch(setCart([]))
                dispatch(setQuantity(0))
                dispatch(setTotalPrice(0))
            }
        })
    }
}
