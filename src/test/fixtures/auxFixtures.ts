import { AuthState } from "../../store/auth/authSlice";

export const initialState: AuthState = {
  uid: null,
  status: "cheking",
  email: null,
  displayName: null,
  errorMessage: null,
  photoURL: null,
};

export const authenticatedState: AuthState = {
  uid: "123ABC",
  status: "authenticated",
  email: "demo@google.com",
  displayName: "Demo User",
  errorMessage: null,
  photoURL: "https://photo.jpg",
};

export const notAuthenticatedState: AuthState = {
  uid: null,
  status: "not-authenticated",
  email: null,
  displayName: null,
  errorMessage: null,
  photoURL: null,
};


export const demoUser: AuthState = {
    uid: "123ABC",
    email: "demo@google.com",
    displayName: "Demo User",
    photoURL: "https://photo.jpg",
    status: "not-authenticated",
    errorMessage: null
}