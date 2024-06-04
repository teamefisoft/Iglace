import { createSlice } from '@reduxjs/toolkit'
import {createOperator,getAllOperationNature,getAllRaison, allOperation} from './actions'

const initialState = {
        operator: [],
        raison:[],
        operation:[]
  
}


export const operationSlice= createSlice({
    name:'operator',  
    initialState,

  extraReducers:(builder)=>{
    builder.addCase(createOperator.fulfilled, (state, action)=>{
        const {data}=action.payload
   
        state.operation = data;
       
  
        console.log("dataOperation",action.payload) 
    })
     .addCase(createOperator.rejected, (state, action) => {
      console.log('action',action)
      // Gérer les erreurs lors de la création de commande
      console.error('Erreur lors de la création de l\'operation :', action.error);
         if (action.payload) {
        console.error('Erreur de la réponse JSON :', action.payload);
      }
    })
    .addCase(getAllOperationNature.fulfilled,(state,action)=>{
      state.operator = action.payload
    })
    .addCase(getAllRaison.fulfilled,(state,action)=>{
      state.raison = action.payload
    })
    .addCase(allOperation.fulfilled,(state,action)=>{
      state.operation = action.payload
   
    })

  }
})

export default operationSlice.reducer