import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { RootState } from "../store";
import { logout, login } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
  const status = useSelector((state: RootState) => state.auth.status);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(logout(""));
      const {
        uid = null,
        photoURL = null,
        email = null,
        displayName = null,
      } = user;
      dispatch(
        login({
          uid,
          email,
          displayName,
          photoURL,
          status,
          errorMessage: "",
        })
      );

      dispatch(startLoadingNotes());
    });
  }, []);

  return status;

};
