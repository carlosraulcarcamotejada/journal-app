import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  body: string;
  date: string;
  imagesURLs: string[];
}

interface JournalState {
  isSaving: boolean;
  savedMessage: string;
  notes: Note[];
  active: Note | null;
}

const initialState: JournalState = {
  isSaving: false,
  savedMessage: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload;
      state.savedMessage = "";
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savedMessage = "";
    },
    updatedNote: (state, action: PayloadAction<Note | null>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action?.payload?.id) return action.payload;
        return note;
      });
      state.savedMessage = `${action.payload?.title}, actualizada correctamente.`;
    },
    setImagesToActiveNote: (state, action: PayloadAction<string[]>) => {
      if (state.active != null) {
        state.active.imagesURLs = [
          ...action.payload,
          ...state.active.imagesURLs,
        ];
      }
      state.isSaving = false;
    },
    clearJournalLogout: (state) => {
      state.active = null;
      state.isSaving = false;
      state.notes = [];
      state.savedMessage = "";
    },
    deleteNoteById: (state, action: PayloadAction<Note | null>) => {
      state.isSaving = false;
      state.active = null;
      state.notes = state.notes.filter(
        (note) => note.id !== action.payload?.id
      );
      state.savedMessage = `${action.payload?.title}, borrada exitosamente.`;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearJournalLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  setSaving,
  updatedNote,
} = journalSlice.actions;

export default journalSlice.reducer;
