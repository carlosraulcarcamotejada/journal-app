import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { getImages } from "../../helpers/getImages";
import { imageDeleter } from "../../helpers/imageDeleter";
import { imagesUploader } from "../../helpers/imagesUploader";
import { loadNotes } from "../../helpers/loadNotes";
import { AppDispatch, RootState } from "../store";
import {
  addNewEmptyNote,
  deleteNoteById,
  Note,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  setSaving,
  updatedNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(savingNewNote());

    const { uid = "" } = getState().auth;

    const newNote: Note = {
      body: "",
      date: new Date().toLocaleString(),
      id: "",
      imagesURLs: [],
      title: "",
    };

    const docRef = doc(collection(firebaseDB, `${uid}/journal/notes`));
    newNote.id = docRef.id;
    await setDoc(docRef, newNote);

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid = "" } = getState().auth;
    if (!uid) throw new Error("El uid no existe");
    const notes: Note[] = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSaving());

    const { uid = "" } = getState().auth;
    const { active:note } = getState().journal;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note?.id}`);
    await setDoc(docRef, note, { merge: true });

    dispatch(updatedNote(note));
  };
};

export const startUploadingImages = (images: FileList | null) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    if (!images) return;
    dispatch(setSaving());

    const imagesUploadPromises = [];

    for (let i = 0; i < images.length; i++) {
      let image = images.item(i);
      imagesUploadPromises.push(imagesUploader(image));
    }

    const imagesUrls = await Promise.all(imagesUploadPromises);

    dispatch(setImagesToActiveNote(imagesUrls));

    const { uid = "" } = getState().auth;
    const { active:note } = getState().journal;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note?.id}`);
    await setDoc(docRef, note, { merge: true });

  };
};

export const startDeletingNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSaving())
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!note) return;

    const { id } = note;

  
    const docRef = doc(firebaseDB,`${uid}/journal/notes/${id}`);

    //"Steps" to start deleting the images from cloudinary.
    const imagesURLs = await getImages(docRef);
    await imageDeleter(imagesURLs);

    await deleteDoc(docRef);
  
    dispatch(deleteNoteById(note));

  };
};
