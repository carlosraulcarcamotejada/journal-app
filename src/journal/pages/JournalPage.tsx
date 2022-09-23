import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { startNewNote } from "../../store/journal";
import { Notification } from "../components";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage: FC = (): JSX.Element => {
  const { isSaving, active } = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<any>();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {!!active ? <NoteView/> : <NothingSelectedView />}

      <Fab
        color="error"
        aria-label="add"
        onClick={onClickNewNote}
        disabled={isSaving}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
      <Notification />
    </JournalLayout>
  );
};
