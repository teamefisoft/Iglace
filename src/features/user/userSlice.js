import { createSlice } from '@reduxjs/toolkit'
import {
  loginUser,
  insertUser,
/*   getCurrentUser, */
  getAllUsers, 
  getAllLibelles,
  createLibelle,
  deleteManyUsers,
  updateUsers,
  updateLibeller,
  deleteLibeller,
  getProvinces,
  getVilles,
  getCommunes,
} from './actions'

const initialState = {
  data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null,
  users: [],
  libelles: [],
  authenticated: Boolean(localStorage.getItem('token')),
   authorizing: true, 
  email: '',
  token: localStorage.getItem('token'),
  agent_ID: localStorage.getItem('agent_ID'),
  user_ID: localStorage.getItem('user_ID'),

  deletingUsers: false,
  provinces: [],
  villes: [],
  communes: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear()
      localStorage.removeItem('token')
      state.authenticated = false
    },
  },
   
  extraReducers: (builder) => {
    builder
     
       .addCase(loginUser.fulfilled, (state, action) => {
      const { data, token } = action.payload;
      state.data = data; 
    //  console.log("user",data)  
      state.token = token;
      state.authenticated = true;
      state.agent_ID = data.agent_ID;
      state.user_ID = data.user_ID;
      localStorage.setItem('token', token);
      localStorage.setItem('agent_ID', data.agent_ID);
      localStorage.setItem('user_ID', data.user_ID);
      localStorage.setItem('data', JSON.stringify(data));
    })

      .addCase(insertUser.fulfilled, (state, action) => {
        state.users = [...state.users.data, action.payload] 
      //  console.log("payload",action.payload)
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.users = [
          ...state.users.filter((user) => user._id != action.payload._id),
          action.payload,
        ]
      })
      // .addCase(getCurrentUser.pending, (state, action) => {
      //   state.authorizing = true
      // })
      // .addCase(getCurrentUser.rejected, (state, action) => {
      //   state.authorizing = false
      // })
      // .addCase(getCurrentUser.fulfilled, (state, action) => {
      //   state.data = action.payload
      //   state.email = state.data.email
      //   state.authenticated = true
      //   state.authorizing = false
      // })
       .addCase(getAllUsers.fulfilled, (state, action) => {
         state.users = action.payload
       })
      .addCase(getAllLibelles.fulfilled, (state, action) => {
        state.libelles = action.payload
      })
      .addCase(createLibelle.fulfilled, (state, action) => {
        const uniqueNames = {}
        state.libelles = [...state.libelles, action.payload].filter((obj) => {
          if (!uniqueNames[obj.name]) {
            uniqueNames[obj.name] = true
            return true
          }
          return false
        })
      })
      .addCase(updateLibeller.fulfilled, (state, action) => {
        state.libelles = [...state.libelles].map((libelle) =>
          action.payload._id === libelle._id ? action.payload : libelle
        )
      })
      .addCase(deleteLibeller.fulfilled, (state, { payload }) => {
        state.libelles = [...state.libelles].filter(
          (libelle) => payload !== libelle.name
        )
      })
      .addCase(deleteManyUsers.pending, (state) => {
        state.deletingUsers = true
      })
      .addCase(deleteManyUsers.fulfilled, (state, { payload }) => {
        state.users = [...state.users].filter(
          (user) => !payload.includes(user.email)
        )
        state.deletingUsers = false
      })
      .addCase(deleteManyUsers.rejected, (state) => {
        state.deletingUsers = false
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload.data
      })
      .addCase(getVilles.fulfilled, (state, action) => {
        state.villes = action.payload.data
      })
      .addCase(getCommunes.fulfilled, (state, action) => {
        state.communes = action.payload.data
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer