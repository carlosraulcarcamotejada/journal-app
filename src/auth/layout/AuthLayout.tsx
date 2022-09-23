import {FC} from 'react';
import { Grid, Paper, Typography } from '@mui/material'


type props = {
    children : JSX.Element | JSX.Element[] ,
    title: string,
}


export const AuthLayout:FC<props> = ({children,title}):JSX.Element => {
  return (
    <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={0}
    sx={{minHeight:'100vh',backgroundColor:'primary.main',padding:4}}
    >
      <Grid
        item
        xs={3}
        sx={{
            width: {sm:450},
        }}
      >
        <Paper
         sx={{padding:3}}
         elevation={2}
        >
          <Typography variant='h5'sx={{mb:1}} >{title}</Typography>
            {children}
        </Paper>
     </Grid>
     </Grid>
  )
}


