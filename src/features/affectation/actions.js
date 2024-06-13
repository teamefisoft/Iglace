import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllAffectation = createAsyncThunk(
    "affectation/allAffectation",
    async () => {
        try {
            const response = await fetch(
              "https://iglace.sysmanager.pro/api/v1/dashboard/assignment",{
                method:'GET',
                 headers: {
                    'Content-Type': 'application/json',
                  }
              }
            );
            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.message);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const putAffectation = createAsyncThunk(
    'update/assignment',
    async (payload, thunkAPI) => {
      const { ID_agent, ID_sale_site } = payload;
  console.log(payload);
      try {
        const newSaleSite = {
            ID_sale_site,
        };
  
        const response = await fetch(
          `https://iglace.sysmanager.pro/api/v1/dashboard/assignment/${ID_agent}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSaleSite),
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
         // console.log(errorData)
          return thunkAPI.rejectWithValue(errorData.message);
        }
  
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );