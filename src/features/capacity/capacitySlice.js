import { createSlice } from '@reduxjs/toolkit'
import {getAllCapcity} from './actions'


const initialState = {
    capacity: [],
    products: []
}


export const capacitySlice= createSlice({
    name:'capacity', 
    initialState,

  extraReducers:(builder)=>{
    builder
    .addCase(getAllCapcity.fulfilled,(state,action)=>{
      state.capacity = action.payload
     
    })
  }
})

export default capacitySlice.reducer