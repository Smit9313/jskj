// import { createSlice } from "@reduxjs/toolkit";
// import { addCart, getCart } from "../services/api/Handler";

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//       products:[],
//       totalquantity: 0,
//       totalprice: 0
//     },
//     reducers: {
//         getCart(state,action){
//             state.products=action.payload,
//             state.totalprice=action.payload

//         }
        // add(state, action) {
        //     const addItem = action.payload
        //     const checkExisting = state.products.find((item)=>(item.id === addItem.id))
        //     state.totalprice += addItem.price
        //     state.totalquantity++;  
            
        //     if(!checkExisting){
        //         state.products.push({...addItem, quantity:1})
        //     }else{
        //         checkExisting.quantity++;
        //         checkExisting.totalprice += addItem.price
        //     }
        // },
        // setCart(state,action){
        //     const itemInCart = state.products.find((item) => item.id === action.payload.id);
        //     if (itemInCart) {
        //       itemInCart.quantity++;
        //     } else {
        //       state.cart.push({ ...action.payload, quantity: 1 });
        //     }
        // }
        // addItem(state, action) {
        //     const itemInCart = state.products.find((item) => item.id === action.payload.id);
        //     if (itemInCart) {
        //       itemInCart.quantity++;
        //     } else {
        //       state.products.push({ ...action.payload, quantity: 1 });
        //     }
            // You may need to update totalquantity and totalprice based on your product structure.
        // },

        // removeAll(state, action) {
        //     const removeItem = action.payload
        //     state.totalprice -= removeItem.price
        //     state.totalquantity -= removeItem.quantity
        //     state.products = state.products.filter((item)=> item.id !== removeItem.id)
        // },

    //     removeOne(state, action) {
    //         const id = action.payload;
    //         const checkExisting = state.products.find( (item) => item.id === id)
    //         state.totalprice = state.totalprice - checkExisting.price
    //         state.totalquantity--
      
    //         if(checkExisting.quantity === 1)
    //         {
    //           state.products = state.products.filter((item) => item.id !== id)
    //         }
    //         else
    //         {
    //             checkExisting.quantity--
    //         }

    // },
// }
// });

// export const { setCart,addItem, removeOne, removeAll } = cartSlice.actions;
// export default cartSlice.reducer;

// export function addCartt({data,quantity}){
//     let totalprice;
//     let totalquantity
//     return async function addCartThunk(dispatch,getState){
//         try {
//             console.log("asdf")
//             const res = await addCart({ProductId,quantity})
//             console.log(res.data)
//             dispatch(addItem(res.data))
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }