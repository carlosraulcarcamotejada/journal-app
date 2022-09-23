import { FirebaseError } from "@firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormValues } from "../types/auth/FormValues";
import { FormValuesRegister } from "../types/auth/FormValuesRegister";

import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    //const credentials = GoogleAuthProvider.credentialFromResult(result);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        ok: false,
        errorCode,
        errorMessage,
        error,
      };
    }

    return {
      ok: false,
      error,
    };
  }
};

 
export const registerUserWithEmailPassword = async (
  formValues: FormValuesRegister
) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      formValues.email,
      formValues.password
    );
    const { uid, photoURL, email } = resp.user;

    await updateProfile(firebaseAuth.currentUser || resp.user, {
      displayName: formValues.displayName,
    });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName: formValues.displayName,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        ok: false,
        errorCode,
        errorMessage,
        error,
      };
    }

    return {
      ok: false,
      error,
    };
  }
};

export const loginWithEmailPassword = async (userValues: FormValues) => {
  try {
    const {
      user: { uid, photoURL, email, displayName },
    } = await signInWithEmailAndPassword(
      firebaseAuth,
      userValues.email,
      userValues.password
    );

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        ok: false,
        errorCode,
        errorMessage,
        error,
      };
    }

    return {
      ok: false,
      error,
    };
  }
};

export const logoutFirebase = async () => {
  try {
    return await firebaseAuth.signOut();
  } catch (error) {
    console.log(error);
  }
};
