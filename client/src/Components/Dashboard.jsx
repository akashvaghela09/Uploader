import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteFileFailure, deleteFileRequest, deleteFileSuccess, getFileListFailure, getFileListRequest} from '../Redux/app/action';
import { loadData } from '../utils/localStorage';
import { Button, Grid } from '@material-ui/core';
import styles from "../Styles/Dashboard.module.css";
import { Redirect } from 'react-router';

const Dashboard = () => {
    const dispatch = useDispatch()
    const [fileList, setFileList] = useState([])
    const email = loadData("email")
    const isAuth = useSelector((state) => state.auth.isAuth)

    const handleDelete = (code, adminCode, _id) => {
        dispatch(deleteFileRequest())

        axios.get(`https://api.gofile.io/deleteUpload?c=${code}&ac=${adminCode}`)
        .then((res)=> {
            dispatch(deleteFileSuccess(res.data.status))
        })
        .catch((err)=> {
            const serverErr = deleteFileFailure(err)
            dispatch(serverErr)
        })

        axios.delete(`${process.env.REACT_APP_MONGO_URL}/${_id}`)
        .catch((err)=> {
            const serverErr = deleteFileFailure(err)
            dispatch(serverErr)
        })

        const newData = fileList.filter((el) => el._id !== _id)
        setFileList(newData)
    }

    const getList = () => {
        dispatch(getFileListRequest())
        axios.get(process.env.REACT_APP_MONGO_URL)
        .then((res) => {
            const newData = res.data.data.filter((el) => el.email == email)
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
    if(isAuth !== true){
        return <Redirect to="/"/>
    }

    if(email !== "guest"){
        getList()
    }

    return (
        <Grid container justify="center">
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
                                onClick={() => handleDelete(el.code, el.adminCode, el._id)}
                            >   Delete File
                            </Button>
                        </Grid>
                    </Grid>
                    ) : null
                }
            </Grid>
        </Grid>
    )
}

export {Dashboard}