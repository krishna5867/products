import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        email: '',
        password: '',
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    }
})

export const { login } = AuthSlice.actions;

export default AuthSlice.reducer;


