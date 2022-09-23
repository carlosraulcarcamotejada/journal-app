import { CssBaseline, ThemeProvider } from '@mui/material';
import {FC} from 'react';
import { purpleTheme } from './';

type props = {
    children:JSX.Element | JSX.Element[]
}

export const AppTheme:FC<props> = ({children}):JSX.Element => {
  return (
    <ThemeProvider theme={purpleTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
