import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Link,
  TextField,
  Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { RootState } from "../../store";
import { FormikProps, useFormik } from "formik";
import { FormValues } from "../../types/auth/FormValues";

const initialValues = {
  email: "",
  password: "",
};

export const LoginPage: FC = (): JSX.Element => {
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticating = useMemo(() => status === "cheking", [status]);

  const dispatch = useDispatch<any>();

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  const onSubmit = (values: FormValues) => {
    dispatch(startLoginWithEmailPassword(values));
    //formik.resetForm();
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    onSubmit,
  });

  return (
    <AuthLayout title="Login">
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              label="Correo"
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              label="Contraseña"
              type="Password"
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                disabled={isAuthenticating}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="button"
                onClick={onGoogleSignIn}
                variant="outlined"
                disabled={isAuthenticating}
                fullWidth
                startIcon={<Google />}
              >
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} to="/auth/register" color="inherit">
              Crear cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
