import { createSlice } from '@reduxjs/toolkit'
import {getAllProducts, createProducts} from './actions'

const initialState = {
    products: []
}


export const productsSlice= createSlice({
    name:'products', 
    initialState,

  extraReducers:(builder)=>{
    builder
      .addCase(getAllProducts.fulfilled,(state,action)=>{
        state.products = action.payload;
    }).addCase(createProducts.fulfilled, (state, action)=>{
        const {data}=action.payload
        state.products = data;
        console.log("dataP",action.payload)
    })
  }
})

export default productsSlice.reducer