import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteFileFailure, deleteFileRequest, deleteFileSuccess, getFileListFailure, getFileListRequest, getFileListSuccess} from '../Redux/app/action';
import { loadData } from '../utils/localStorage';
import { Button, Grid, Typography } from '@material-ui/core';
import styles from "../Styles/Dashboard.module.css";
import { Redirect } from 'react-router';

const Dashboard = () => {
    const dispatch = useDispatch()
    const [fileList, setFileList] = useState([])
    const email = loadData("email")
    const isAuth = useSelector((state) => state.auth.isAuth)

    const handleDelete = (_id) => {
        dispatch(deleteFileRequest())
        
        axios.delete(`${process.env.REACT_APP_MONGO_URL}/${_id}`)
        .then(() => {
            getList()
        })
        .catch((err)=> {
            const serverErr = deleteFileFailure(err)
            dispatch(serverErr)
        })
        dispatch(deleteFileSuccess())
    }

    const getList = () => {
        dispatch(getFileListRequest())
        axios.get(process.env.REACT_APP_MONGO_URL)
        .then((res) => {
            console.log(res.data.data)
            const newData = res.data.data.filter((el) => el.email == email)
            dispatch(getFileListSuccess([]))
            setFileList(newData)
        })
        .catch((err)=> {
            const serverErr = getFileListFailure()
            dispatch(serverErr)
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
        getList()
    }, []);

    if(isAuth !== true){
        return <Redirect to="/"/>
    }

    if(email !== "guest" && fileList.length === 0){
        getList()
    }


    return (
        <Grid container justify="center">
            {
                fileList.length > 0 ?

                <Grid container md={10} sm={10} xs={10} justify="center">
                <Grid container justify="center" className={styles.header}>
                    <Grid container justify="flex-start" md={3} sm={3} xs={3} className={styles.header_option}> File Name</Grid>
                    <Grid container justify="flex-start" md={3} sm={3} xs={3} className={styles.header_option}> File Size</Grid>
                    <Grid container justify="center" md={3} sm={3} xs={3} className={styles.header_option}> Download Page</Grid>
                    <Grid container justify="center" md={3} sm={3} xs={3} className={styles.header_option}> Delete File</Grid>
                </Grid>
                {
                    fileList ? fileList.map((el) => 

                    <Grid container md={12} >
                        <Grid className={styles.listItem} container alignItems="center" justify="flex-start" md={3} sm={3} xs={3}>{el.fileName}</Grid>
                        <Grid className={styles.listItem} container alignItems="center" justify="flex-start" md={3} sm={3} xs={3}>{checkSize(el.fileSize)}</Grid>
                        <Grid className={styles.listItem} container justify="center" md={3} sm={3} xs={3}>
                            <Button variant="contained" color="primary" onClick={()=> window.open(el.downloadPage, "_blank")}>Download File</Button>
                        </Grid>
                        <Grid className={styles.listItem} container justify="center" md={3} sm={3} xs={3}>
                            <Button variant="contained" 
                                color="primary" 
                                onClick={() => handleDelete(el._id)}
                            >   Delete File
                            </Button>
                        </Grid>
                    </Grid>
                    ) : null
                }
            </Grid> : <Typography className={styles.emptyList} variant="p">Uploads Not Found</Typography>
            }
        </Grid>
    )
}

export {Dashboard}