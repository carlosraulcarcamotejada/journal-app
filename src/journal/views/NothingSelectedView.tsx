import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import {FC} from 'react';

export const NothingSelectedView:FC = ():JSX.Element => {
  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={{minHeight: 'calc(100vh - 70px)',backgroundColor:'primary.main',borderRadius:3}}
    >
        <Grid item xs={12}>
            <StarOutline sx={{fontSize: 100, color: "white"}} />
        </Grid>

        <Grid item xs={12}>
            <Typography color="white" variant='h5'>Seleccione o cree una entrada</Typography>
        </Grid>
    
    </Grid>
  )
}
