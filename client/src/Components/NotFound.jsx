import { Grid, Typography } from '@material-ui/core';
import React from 'react';

const NotFound = () => {
    return (
        <Grid container direction="column" justify="center" alignItems="center" md={12} sm xs style={{marginTop: "30px"}}>
            <img src="https://tgdown.eu-gb.mybluemix.net/15136326239485888/404.svg" alt="not found" width="40%"/>
            <Typography variant="h2" style={{fontWeight: "bold", color: "#283593"}}>Page Not Found</Typography>
        </Grid>
    )
}

export {NotFound}