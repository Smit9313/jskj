import {createSlice} from '@reduxjs/toolkit'
import { getProduct } from '../services/api/Handler';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        totalProducts:0,
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setTotalProducts(state,action){
            state.totalProducts = action.payload
        }
    },
});

export const { setProducts, setStatus ,setTotalProducts} = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts(page,rowsPerPage,search) {
        return async function fetchProductThunk(dispatch) {
            dispatch(setStatus(STATUSES.LOADING));
            try {
                const res = await getProduct({page,rowsPerPage,search});
                dispatch(setTotalProducts(res.data.totalProduct))
                dispatch(setProducts(res.data));
                dispatch(setStatus(STATUSES.IDLE));
            } catch (err) {
                console.log(err);
                dispatch(setStatus(STATUSES.ERROR));
            }
        };
}
