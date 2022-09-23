import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    uid:string | null,
    status: 'cheking' | 'not-authenticated' | 'authenticated' ,
    email:string | null,
    displayName :string | null,
    photoURL:string | null,
    errorMessage:string | null,
}

const initialState: AuthState = {
  uid:null,
  status: 'cheking',
  email:null,
  displayName:null,
  errorMessage:null,
  photoURL:null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state, action: PayloadAction<AuthState>)=>{
      state.uid = action?.payload.uid || null;
      state.status ='authenticated';
      state.email =  action?.payload.email || null;
      state.displayName = action?.payload.displayName || null;
      state.photoURL = action?.payload.photoURL || null;
      state.errorMessage = null;
    },
    logout:(state?, action?: PayloadAction<string | undefined> )=>{
      state.uid = null;
      state.status ='not-authenticated';
      state.email =  null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = action?.payload || null;
    },
    checkingCredentials:(state)=>{
      state.status = 'cheking';
    }
  },
})

// Action creators are generated for each case reducer function
export const { checkingCredentials,login,logout } = authSlice.actions

export default authSlice.reducer