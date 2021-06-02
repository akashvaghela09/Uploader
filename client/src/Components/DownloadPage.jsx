import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
    dwlBtn: {
        margin: "50px",
        padding: " 20px 40px"
    }
}));

const DownloadPage = () => {
    const { store, fileId , fileName } = useParams();
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const classes = useStyles();
    
    const url = `https://${store}.gofile.io/download/${fileId}/${fileName}`
    
    const getFileInfo = () => {
        axios.get(`https://uploderdb.herokuapp.com/files?q=${fileId}`)
        .then((res) => {
            setName(res.data.data[0].fileName)
            setSize(checkSize(res.data.data[0].fileSize))
        })
    }

    const checkSize = (num) => {
        if(num < 1024){
            return `${num} Bytes`
        } else if (num >= 1024 && num < 1048576){
            return `${(num / 1024).toFixed(2)} KB`
        } else if (num >= 1048576){
            return `${(num / 1024 / 1024).toFixed(2)} MB`
        }
    }
    
    useEffect(() => {
        getFileInfo()
    }, []);
    return (
        <Grid container justify="center">
            <Grid container direction="column" md={10} justify="center" alignItems="center">
                <img src="https://graphiccave.com/wp-content/uploads/2015/04/Downloads-Icon-PNG-Graphic-Cave.png" alt="Download" width="30%" style={{marginTop: "30px"}}/>
                <Typography><b>File: </b>{name}</Typography>
                <Typography><b>Size: </b>{size}</Typography>
                <Button className={classes.dwlBtn} onClick={()=> window.open(url, "_blank")} variant="contained" color="primary">Download</Button>
            </Grid>
        </Grid>
    )
}

export {DownloadPage}