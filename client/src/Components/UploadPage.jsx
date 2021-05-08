import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProgress, getServerFailure, getServerRequest, getServerSuccess, postFileFailure, postFileRequest, postFileSuccess } from '../Redux/app/action';
import axios from 'axios';
import { loadData, saveData } from '../utils/localStorage';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import styles from "../Styles/Upload.module.css"
import ProgressArc from 'progress-arc-component'
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
    uploadBtn: {
      margin: "10px 25%",
      padding: "10px",
      width: "50%"
    },
    doneBtn: {
        margin: "10px",
        width: "70%",
        padding: "10px"
    },
    doneText: {
        margin: "10px"
    },
    grid1 : {
        marginBottom: "50px"
    }
}));

// For Progress Bar
const StyledProgressArc = styled(ProgressArc)`
 height: 15em;
 width: 15em;
 border-radius: 0.5em;
 padding: 1em;
 margin: 100px
`
const UploadPage = () => {
    const dispatch = useDispatch()
    const server_name = useSelector((state) => state.app.server_name)
    const progress = useSelector((state) => state.app.progress)
    const isError = useSelector((state) => state.app.isError)
    const fileData = useSelector((state) => state.app.fileData)
    const classes = useStyles();

    // set by Default email as guest
    if(loadData("email") == undefined){
        saveData("email", "guest")
    } else {
        console.log(loadData("email"));
    }

    let file;
    let fileSize;
    let formData = new FormData();
    const email = loadData("email")    

    const handleFileUpload = (e) => {
        file = e.target.files[0];
        fileSize = file.size
        formData.append("file", file);
    }

    const uploadToServer = () => {
        dispatch(postFileRequest())
       
        // upload file on gofile api server
        axios.post(`https://${server_name}.gofile.io/uploadFile`, formData, {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                dispatch(getProgress(percentCompleted))
            }
        }
        )
        .then((res)=> {

            let fileInfo = {
                "email": email,
                "code": res.data.data.code,
                "adminCode": res.data.data.adminCode,
                "fileName": res.data.data.fileName,
                "fileSize": file.size,
                "md5": res.data.data.md5,
                "directLink": res.data.data.directLink,
                "downloadPage": `https://uploder.vercel.app/download/${res.data.data.code}/${res.data.data.md5}/${res.data.data.fileName}`
            }
            const postFileAction = postFileSuccess(fileInfo)

            // upload file data on mongodb server
            axios.post(process.env.REACT_APP_MONGO_URL, {
                "email": email,
                "code": res.data.data.code,
                "adminCode": res.data.data.adminCode,
                "fileName": res.data.data.fileName,
                "fileSize": fileSize,
                "md5": res.data.data.md5,
                "directLink": res.data.data.directLink,
                "downloadPage": `https://uploder.vercel.app/download/${res.data.data.code}/${res.data.data.md5}/${res.data.data.fileName}`
            })
            .then((res) => {
                console.log(res);
            })

            dispatch(postFileAction)
        })
        .catch((err)=> {
            const serverErr = postFileFailure()
            dispatch(serverErr)
        })
        
    }
    
    const getActiveServer = () => {
        dispatch(getServerRequest())
        
        axios.get("https://api.gofile.io/getServer")
        .then((res)=> {
            const getServerAction = getServerSuccess(res.data.data.server)
            dispatch(getServerAction)
        })
        .catch((err)=> {
            const serverErr = getServerFailure()
            dispatch(serverErr)
        })
    }
  
    return (
        <Grid container justify="center" >
            <Grid container align="center" direction="column"  md={5} xs={10} className={classes.grid1}>
                <img src="./images/upload.svg" alt="Upload" className={styles.uploadImg}/>
                <Button
                    variant="contained"
                    component="label"
                    className={classes.uploadBtn}
                >
                    Browse
                    <input
                        type="file"
                        hidden
                        multiple={false} 
                        onChange={handleFileUpload} 
                        onClick={() => getActiveServer()}
                    />
                </Button>
                <Button className={classes.uploadBtn} variant="contained" color="primary" onClick={uploadToServer}>Upload</Button>
                
            </Grid>
            <Grid container justify="center" align="center" md={5} xs={8}>
                {
                    progress > 0 && progress < 100 ? <StyledProgressArc arcColor="#1565C0" textColor="#1565C0" value={progress}/> : null
                }
                {
                    isError && <h1>Something went wrong ...</h1>
                }
                {
                    fileData && 
                    <Grid item md={8} className={styles.completeCard}>
                        <img src="./images/done.png" alt="Done" className={styles.done}/>
                        <Typography variant="h5" className={classes.doneText}>
                            File Uploaded Successfully
                        </Typography>
                        <Button className={classes.doneBtn} variant="contained" href={fileData.directLink} target="_blank" rel="noopener noreferrer">Download</Button><br/><br/>
                        <Button className={classes.doneBtn} variant="contained" color="primary" onClick={() =>  navigator.clipboard.writeText(fileData.downloadPage)}>Copy Link</Button>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

export {UploadPage}