import { createAsyncThunk } from "@reduxjs/toolkit";


export const getPriceBySiteVente = createAsyncThunk(
    "siteVente/allSitePriceVente",
    async () => {
        try {
            const response = await fetch(
                "https://iglace.sysmanager.pro/api/v1/dashboard/sale_site_price"
            );
            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.message);
            }
            const data = await response.json();
           // console.log('sitesite', data)
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getAllSiteVente = createAsyncThunk(
    "siteVente/allSiteVente",
    async () => {
        try {
            const response = await fetch(
                "https://iglace.sysmanager.pro/api/v1/dashboard/sale_site", {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }}
            );
            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.message);
            }
            const data = await response.json();
         //  console.log('all', data)
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const createSite = createAsyncThunk(
  '/create',
  async ({ name, location, contacts, ID_province, ID_commune, ID_ville, ID_user_created_at }, thunkAPI) => {
    try {
      const requestBody = {
        name,
        location,
        contacts,
        ID_province,
        ID_commune,
        ID_ville,
        ID_user_created_at,
      };

      const response = await fetch('https://iglace.sysmanager.pro/api/v1/dashboard/sale_site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
         const errorData = await response.json();
        
       //  console.log(errorData);
        return thunkAPI.rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);