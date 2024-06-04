import { createAsyncThunk } from '@reduxjs/toolkit'


export const getAllProducts = createAsyncThunk('/allproduct', async()=>{
  try{
     const response = await fetch('https://iglace.sysmanager.pro/api/v1/product',{
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

export const createProducts = createAsyncThunk('/post',async({ description, is_available, unit_price, unit_quatity, ID_currency,ID_user_created_at }, thunkAPI)=>{
    try{
        const newProduct ={ 

            description,
            is_available,
            unit_price,
            unit_quatity,
            ID_currency,
            ID_user_created_at
        }

        const response = await fetch('https://iglace.sysmanager.pro/api/v1/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }
      const data = await response.json();
      return data;
   

    }catch(error){}
})