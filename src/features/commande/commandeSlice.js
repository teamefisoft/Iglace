import { createSlice } from '@reduxjs/toolkit'
import {createOrder,getAllCommande,putCommande} from './actions'

const initialState = {
    orders: [],
    products: []
}


export const commandesSlice= createSlice({
   // name:'products',
    name:'commandes',  
    initialState,

  extraReducers:(builder)=>{
    builder.addCase(createOrder.fulfilled, (state, action)=>{
      const {data}=action.payload
      
        state.orders = [...state.orders.data, data];
        console.log("data",action.payload)
    })
     .addCase(createOrder.rejected, (state, action) => {
      // Gérer les erreurs lors de la création de commande
      console.error('Erreur lors de la création de la commande :', action.error);
    })
    .addCase(getAllCommande.fulfilled,(state,action)=>{
      state.orders = action.payload
    })
    .addCase(putCommande.fulfilled, (state, action) => {
        state.orders = [
          ...state.orders?.data.filter((order) => order.order_rf != action.payload.order_rf),
          action.payload,
          console.log('slice',action.payload),
        ]
      })
  }
})

export default commandesSlice.reducer