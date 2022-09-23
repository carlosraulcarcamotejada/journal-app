import { FC } from "react";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Note, setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";

type props = {
  note: Note,
  index:number,
  selectedIndex:number,
  setSelectedIndex:(selectedIndex:number)=>void,
};



export const SideBarItem: FC<props> = ({ note, index ,selectedIndex, setSelectedIndex }): JSX.Element => {

  const dispatch = useDispatch();

  const onSetSelectedNote = () => {
    dispatch(setActiveNote(note));
  }


  return (
    <ListItem disablePadding onClick={ () => { 
      onSetSelectedNote()
      setSelectedIndex(index)
      }}>
      <ListItemButton selected = {selectedIndex === index }>
        <Grid container>
          <ListItemText primary={note.title} />
          <ListItemText
            secondary={note.body}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
