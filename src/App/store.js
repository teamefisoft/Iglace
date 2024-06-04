import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import commandesReducer from '../features/commande/commandeSlice';
import capacitySlice from '../features/capacity/capacitySlice';
import productsSlice from '../features/products/productsSlice';
import operationSlice from '../features/operation/operationSlice';
import affectationSlice from '../features/affectation/affectationSlice';
import siteVenteSlice from '../features/siteVente/siteVenteSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    commandes: commandesReducer,
    capacity:capacitySlice,
    products:productsSlice,
    operation:operationSlice,
    affectation : affectationSlice,
    siteVente:siteVenteSlice,
 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})