import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    dwlBtn: {
        margin: "50px",
        padding: " 20px 40px"
    }
}));

const DownloadPage = () => {
    const { code, md5, file } = useParams();
    const classes = useStyles();

    const url = `https://srv-store2.gofile.io/download/${code}/${md5}/${file}`
    return (
        <Grid container justify="center">
            <Grid container direction="column" md={10} justify="center" alignItems="center">
                <img src="https://tgdown.eu-gb.mybluemix.net/15117187865214912/cloud.svg" alt="Download" width="30%" style={{marginTop: "30px"}}/>
                <Button className={classes.dwlBtn} onClick={()=> window.open(url, "_blank")} variant="contained" color="primary">Download</Button>
            </Grid>
        </Grid>
    )
}

export {DownloadPage}