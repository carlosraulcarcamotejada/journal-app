import { FC, useMemo } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
// import { useForm } from '../../hooks';
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { FormValuesRegister } from "../../types/auth/FormValuesRegister";
import { RootState } from "../../store";

const initialValues: FormValuesRegister = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  displayName: Yup.string()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .required("El nombre es obligatorio."),
  email: Yup.string()
    .email("Debe ser un email válido")
    .required("El correo es obligatorio."),
  password: Yup.string()
    .min(8, "Debe de ser de al menos 8 caracteres")
    .max(12, "Máximo 12 caracteres")
    .required("El campo contraseña es obligatorio"),
};

export const RegisterPage: FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isCheckingAuthentication = useMemo(
    () => status === "cheking",
    [status]
  );

  const onSubmit = (values: FormValuesRegister) => {
    if (!formik.isValid) return;
    dispatch(startCreatingUserWithEmailPassword(values));
    formik.resetForm();
  };

  const formik: FormikProps<FormValuesRegister> = useFormik<FormValuesRegister>(
    {
      initialValues,
      validationSchema: Yup.object(formValidations),
      onSubmit,
    }
  );

  return (
    <AuthLayout title="Register">
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="displayName"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              label="Nombre"
              type="text"
              fullWidth
              error={!!formik.errors.displayName && formik.touched.displayName}
              helperText={
                !!formik.errors.displayName &&
                formik.touched.displayName &&
                formik.errors.displayName
              }
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="Correo"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              type="email"
              fullWidth
              error={!!formik.errors.email && formik.touched.email}
              helperText={
                !!formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
              }
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Contraseña"
              type="Password"
              fullWidth
              error={!!formik.errors.password && formik.touched.password}
              helperText={
                !!formik.errors.password &&
                formik.touched.password &&
                formik.errors.password
              }
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={!formik.isValid || isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crer cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tiene una cuenta?</Typography>
            <Link component={RouterLink} to="/auth/login" color="inherit">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
