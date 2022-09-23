import { FC, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

type props = {
  children: JSX.Element | JSX.Element[];
};

const DraweWidth = 240;

export const JournalLayout: FC<props> = ({ children }): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      {/*Navba*/}
      <NavBar DraweWidth={DraweWidth} handleDrawerToggle={handleDrawerToggle} />

      {/*Sidebar*/}
      <SideBar
        DraweWidth={DraweWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Toolbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${DraweWidth}px)` },
          ml: { sm: `${DraweWidth}px` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
