import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../utils/client'
//import { data } from 'autoprefixer'
 import axios from 'axios'


 export const loginUser = createAsyncThunk(
  '/login',
  async ({ login, pwd }, thunkAPI) => {
 
    try {
      const response = await fetch('https://iglace.sysmanager.pro/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, pwd }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return thunkAPI.rejectWithValue('Invalid email or password');
      } else {
        return thunkAPI.rejectWithValue('Network error');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error');
    }
  }
);


// export const getAllUsers = createAsyncThunk('user/all', async () => {
//   const { data } = await client().get('/users/')
//   return data
// })


export const insertUser = createAsyncThunk(
  '/signup',
  async ({ phone, first_name, second_name, third_name, sex, birth_place, email, photo_url, Grade, born_at, hired_at, ID_service, ID_direction, ID_province, ID_commune, ID_ville, pwd, pwd_confirm, availability, fonction, ...rest }, thunkAPI) => {
    try {
      const requestBody = {
        phone,
        first_name,
        second_name,
        third_name,
        sex,
        birth_place,
        email,
        photo_url,
        Grade,
        born_at,
        hired_at,
        ID_service,
        ID_direction,
        ID_province,
        ID_commune,
        ID_ville,
        pwd,
        pwd_confirm,
        availability,
        'function': fonction
      };

      const response = await fetch('https://iglace.sysmanager.pro/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // const errorData = await response.json();
         const errorData = await response.text();
         console.log(errorData);
        return thunkAPI.rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUsers = createAsyncThunk(
  'user/update',
  async ({ key, value, id }, thunkAPI) => {
    try {
      const { data } = await client().put('/users/', {
        key,
        value,
        id,
      })
      return data
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response?.data?.message)
      }
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const getAllUsers=createAsyncThunk('user/getUser', async()=>{
  try{
    const response = await fetch('https://iglace.sysmanager.pro/api/v1/user',{
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

// export const getCurrentUser = createAsyncThunk('auth', async () => {
//   const { data } = await client().get('auth/login')
//   return data
// })

export const createLibelle = createAsyncThunk(
  'user/create/libelle',
  async ({ name }) => {
    const { data } = await client().post('/libelle', { name })
    return data
  }
)

export const getAllLibelles = createAsyncThunk('user/libelles', async () => {
  const { data } = await client().get('/libelle')
  return data
})

export const deleteManyUsers = createAsyncThunk(
  'user/delete',
  async ({ emails }) => {
    const { data } = await client().delete('/users', { data: { emails } })
    return data
  }
)
export const updateLibeller = createAsyncThunk(
  'libelle/update',
  async ({ key, value, id }, thunkAPI) => {
    try {
      const { data } = await client().put('/libelle/', {
        key,
        value,
        id,
      })
      console.log('Data ', data)
      return data
    } catch (error) {
      console.log('Errro ', error)
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response?.data?.message)
      }
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
export const deleteLibeller = createAsyncThunk(
  'libelle/delete',
  async ({ name }) => {
    const { data } = await client().delete('/libelle', {
      data: { name },
    })
    return data
  }
)

// provinces
export const getProvinces = createAsyncThunk('get/provinces', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://iglace.sysmanager.pro/api/v1/address/province')
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error)
  }  
})

export const getVilles = createAsyncThunk('get/villes', async ({ ID_province }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://iglace.sysmanager.pro/api/v1/address/ville?ID_province=${ID_province}`)
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getCommunes = createAsyncThunk('get/communes', async ({ ID_ville }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://iglace.sysmanager.pro/api/v1/address/commune?ID_ville=${ID_ville}`)
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})