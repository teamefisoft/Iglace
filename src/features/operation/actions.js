import { createAsyncThunk } from '@reduxjs/toolkit'

export const createOperator = createAsyncThunk(
  '/operator',
  async ({ ID_agent, total_sum, total_quantity, total_volume, ID_currency, ID_sale_site, ID_operation_nature, ID_operation_reason, created_by_user_ID, ID_unit_volume, annex, stock }, thunkAPI) => {
    try {
      const operationData = {
        ID_agent,
        total_sum,
        total_quantity,
        total_volume,
        ID_currency,
        ID_sale_site,
        ID_operation_nature,
        ID_operation_reason,
        created_by_user_ID,
        ID_unit_volume,
        annex: annex ? annex.map(({ volume, articles, observation, quantity, unit_price, ID_currency }) => ({
          volume,
          articles,
          observation,
          quantity,
          unit_price,
          ID_currency
        })) : [],
        stock: stock ? stock.map(({ ID_product, quantity, ID_volume_unit, price, ID_currency, created_by_user_ID }) => ({
          ID_product,
          quantity,
          ID_volume_unit,
          price,
          ID_currency,
          created_by_user_ID
        })) : []
      };

      const response = await fetch('https://iglace.sysmanager.pro/api/v1/operation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operationData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
         // console.log(errorData);
        } catch (error) {
          console.error('Erreur lors de l\'extraction des données d\'erreur JSON :', error);
          errorData = { message: 'Erreur inconnue lors de la création de l\'opération' };
        }
        return thunkAPI.rejectWithValue(errorData.message);
      }

      const data = await response.json().catch(error => {
        console.error('Erreur lors de l\'extraction des données JSON :', error);
        return { message: 'Erreur inconnue lors de la création de l\'opération' };
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getAllOperationNature=createAsyncThunk('operator/getAll', async()=>{
  try{
    const response = await fetch('https://iglace.sysmanager.pro/api/v1/operation/nature',{
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

export const getAllRaison=createAsyncThunk('operator/getAllraison', async()=>{
  try{
    const response = await fetch('https://iglace.sysmanager.pro/api/v1/operation/reason',{
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

export const allOperation=createAsyncThunk('operator/operation', async()=>{
  try{
    const response = await fetch('https://iglace.sysmanager.pro/api/v1/operation',{
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
   //   console.log("data",data)
      return data;
  }catch(error){
    return thunkAPI.rejectWithValue(error.message)
  }

})

