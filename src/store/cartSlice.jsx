import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      products:[],
      totalquantity: 0,
      totalprice: 0
    },
    reducers: {
        add(state, action) {
            const addItem = action.payload
            const checkExisting = state.products.find((item)=>(item.id === addItem.id))
            state.totalprice += addItem.price
            state.totalquantity++;  
            
            if(!checkExisting){
                state.products.push({...addItem, quantity:1})
            }else{
                checkExisting.quantity++;
                checkExisting.totalprice += addItem.price
            }
        },

        removeAll(state, action) {
            const removeItem = action.payload
            state.totalprice -= removeItem.price
            state.totalquantity -= removeItem.quantity
            state.products = state.products.filter((item)=> item.id !== removeItem.id)
        },

        removeOne(state, action) {
            const id = action.payload;
            const checkExisting = state.products.find( (item) => item.id === id)
            state.totalprice = state.totalprice - checkExisting.price
            state.totalquantity--
      
            if(checkExisting.quantity === 1)
            {
              state.products = state.products.filter((item) => item.id !== id)
            }
            else
            {
                checkExisting.quantity--
            }

    },
}
});

export const { add, removeOne, removeAll } = cartSlice.actions;
export default cartSlice.reducer;