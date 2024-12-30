import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';  
import CartReducer from './CartSlice';
const index = configureStore({
  reducer: {
    auth: AuthReducer,
    cart: CartReducer  
  },
});


export default index
