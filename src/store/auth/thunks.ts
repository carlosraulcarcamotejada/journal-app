import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { FormValues } from "../../types/auth/FormValues";
import { FormValuesRegister } from "../../types/auth/FormValuesRegister";
import { clearJournalLogout } from "../journal";
import { AppDispatch } from "../store"
import { checkingCredentials, login, logout } from "./authSlice";


export const startGoogleSignIn = () => {
    return async (dispatch:AppDispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        
        if(!result.ok) return dispatch(logout(result?.errorMessage));

        dispatch(login({
            uid:result.uid || null,
            email:result.email || null,
            displayName:result.displayName || null,
            errorMessage:null,
            photoURL:result.photoURL || null,
            status:'authenticated',
        }));

        
    }
}


export const startCreatingUserWithEmailPassword = (UserValues:FormValuesRegister) => {
    return async (dispatch:AppDispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid = null, photoURL = null, errorMessage = null , email = null, displayName = null } = await registerUserWithEmailPassword(UserValues);
        
        if(!ok) return dispatch(logout(errorMessage || ok.toString()));

        dispatch(login({
            uid,
            email,
            displayName,
            errorMessage,
            photoURL,
            status:'authenticated',
        }));

    }
}


export const startLoginWithEmailPassword = (userValues:FormValues) => {
    return async (dispatch:AppDispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid = null, photoURL = null, errorMessage = null , email = null, displayName = null }  = await loginWithEmailPassword(userValues);

        if(!ok) return dispatch(logout(errorMessage || ok.toString()));

        dispatch(login({
            uid,
            email,
            displayName,
            errorMessage,
            photoURL,
            status:'authenticated',
        }));
    }
}


export const startLogout = () => {
    return async (dispatch:AppDispatch) => {
        await logoutFirebase();
        dispatch(clearJournalLogout());
        dispatch(logout());
    }
}