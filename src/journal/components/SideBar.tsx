import { FC, useState } from "react";
import {
  Box,
  Divider,
  SwipeableDrawer,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SideBarItem } from "./SideBarItem";

type props = {
  DraweWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

export const SideBar: FC<props> = ({
  DraweWidth,
  mobileOpen,
  handleDrawerToggle,
}): JSX.Element => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>
      <Divider />

      <List>
        {notes.map((note, index) => (
          <SideBarItem
            key={note.id}
            note={note}
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: `${DraweWidth}px` }, flexShrink: { sm: 0 } }}
    >
      <SwipeableDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: `${DraweWidth}px`,
          },
        }}
      >
        {drawer}
      </SwipeableDrawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: `${DraweWidth}px`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
