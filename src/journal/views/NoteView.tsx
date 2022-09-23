import { FC, useEffect } from "react";
import { PhotoCamera, Save } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import { FormikProps, useFormik } from "formik";
import { ImageGallery } from "../components";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingImages,
} from "../../store/journal";

const formValidations = {
  title: Yup.string()
    .min(1, "The title shouldn't be empty")
    .required("The field title is required."),
  body: Yup.string()
    .min(1, "Should be at least 1 characters")
    .max(40, "Should be at max 12 characters")
    .required("The field body is required."),
};

type formValues = {
  title: string;
  body: string;
};

export const NoteView: FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();
  const { active: note, isSaving } = useSelector(
    (state: RootState) => state.journal
  );

  const formik: FormikProps<formValues> = useFormik<formValues>({
    initialValues: {
      title: note?.title || "",
      body: note?.body || "",
    },
    validationSchema: Yup.object(formValidations),
    onSubmit: () => {},
  });

  useEffect(() => {
    formik.setValues({
      title: note?.title || "",
      body: note?.body || "",
    });
  }, [note?.id]);

  useEffect(() => {
    dispatch(
      setActiveNote({
        body: formik.values.body,
        title: formik.values.title,
        id: note?.id || "",
        date: note?.date || "",
        imagesURLs: note?.imagesURLs || [],
      })
    );
  }, [formik.values]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.files?.length === 0) return;

    dispatch(startUploadingImages(target.files));
    //dispatch(startSaveNote());
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography> {note?.date}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          sx={{ mr: 1 }}
          onClick={onDelete}
          color="primary"
          aria-label="delete"
          disabled={isSaving}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          disabled={isSaving}
          sx={{ mr: 2 }}
        >
          <input
            onChange={(e) => onFileInputChange(e)}
            hidden
            multiple
            accept="image/*"
            type="file"
          />
          <PhotoCamera />
        </IconButton>
        <Button disabled={isSaving} onClick={onSaveNote} startIcon={<Save />}>
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Enter a title"
          onBlur={formik.handleBlur}
          label="Título"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Que aconteció hoy"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
