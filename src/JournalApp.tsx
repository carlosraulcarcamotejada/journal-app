import { CssBaseline } from "@mui/material";
import { FC } from "react";
import { AppRouter } from "./router/AppRouter";
// import { AppTheme } from "./theme";

export const JournalApp: FC = (): JSX.Element => {
  return (
    // <AppTheme>
    <>
      <CssBaseline />
      <AppRouter />
    </>
    // </AppTheme>
  );
};
