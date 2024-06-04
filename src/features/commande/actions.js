import { createAsyncThunk } from '@reduxjs/toolkit'


export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ description, ID_ordering_agent, ID_user_created_at, ID_sale_site, line }, thunkAPI) => {
    try {
      const orderData = {
        description,
        ID_ordering_agent,
        ID_user_created_at,
        ID_sale_site,
        line: line.map(({ quantity, ID_quantity_unit, ID_product }) => ({
          quantity,
          ID_quantity_unit,
          ID_product,
        })),
      };

      const response = await fetch('https://iglace.sysmanager.pro/api/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

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
);


export const getAllCommande=createAsyncThunk('orders/getOrder', async()=>{
  try{
    const response = await fetch('https://iglace.sysmanager.pro/api/v1/order',{
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

export const putCommande = createAsyncThunk(
  'order/delivery',
  async (payload, thunkAPI) => {
    const { order_rf, status, ID_delivery_agent } = payload;

    try {
      const newStatus = {
        status,
        ID_delivery_agent,
      };

      const response = await fetch(
        `https://iglace.sysmanager.pro/api/v1/order/delivery/${order_rf}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStatus),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        return thunkAPI.rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const putCommade = createAsyncThunk('oder/delivery', async( order_rf, status, ID_delivery_agent)=>{
  try{
console.log('api',order_rf)
const newStatus={
  status : order_rf.status,
  ID_delivery_agent : order_rf.ID_delivery_agent
}

     const response = await fetch(`https://iglace.eyanofinance.org/api/v1/order/delivery/${order_rf.order_rf}`,{
      method:'PUT',
       headers: {
          'Content-Type': 'application/json',
          'order_rf':order_rf
        },
        body: JSON.stringify(newStatus),
    })
     if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        return thunkAPI.rejectWithValue(errorData.message);
      }
      const data = await response.json();
      return data;
  }catch(error){
console.log(error)
    return thunkAPI.rejectWithValue(error.message)
  }
})