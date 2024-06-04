import { createSlice } from "@reduxjs/toolkit";
import {getPriceBySiteVente,getAllSiteVente, createSite} from "./actions";


const initialState = {
    siteVente: [],
    priceSite:[],
}
export const siteVenteSlice = createSlice({
    name: "siteVente",
    initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPriceBySiteVente.fulfilled, (state, action) => {
        state.priceSite = action.payload;
        
      })
      .addCase(getAllSiteVente.fulfilled, (state, action) => {
        state.siteVente = action.payload;
    
      })
      .addCase(createSite.fulfilled, (state, action) => {
        state.siteVente = [...state.siteVente.data, action.payload];
        console.log("dallta", action.payload)
      })
  },
})
export default siteVenteSlice.reducer