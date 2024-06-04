import { createSlice } from "@reduxjs/toolkit";
import { getAllAffectation } from "./actions";


const initialState = {
    affectation: [],
}
export const affectationSlice = createSlice({
    name: "affectation",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllAffectation.fulfilled, (state, action) => {
                state.affectation = action.payload;
            })
    },
})
export default affectationSlice.reducer