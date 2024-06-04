import { createAsyncThunk } from '@reduxjs/toolkit'


export const getAllCapcity = createAsyncThunk('oder/allCapacity', async()=>{
  try{
     const response = await fetch('https://iglace.sysmanager.pro/api/v1/dashboard/capacity_unit',{
      method:'GET',
       headers: {
          'Content-Type': 'application/json',
        }
    })
     if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }
      const data = await response.json();
      return data;
  }catch(error){

    return thunkAPI.rejectWithValue(error.message)
  }
})