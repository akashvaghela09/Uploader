import React, { useState } from 'react';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { getUserFailure, getUserRequest, getUserSuccess } from '../Redux/auth/action';
import { saveData } from '../utils/localStorage';
import { Redirect, useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import styles from "../Styles/Form.module.css";
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    secondBtn: {
      backgroundColor: "#43A047",
      color: "white",
      "&:hover": {
          backgroundColor: "#388E3C"
      },
      marginTop: "10px"
    }
}));

const Login = () => {
    const dispatch = useDispatch()
    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const isAuth = useSelector((state) => state.auth.isAuth)
    const history = useHistory()

    const handleClick = () => {
        let config = {
            "email": email,
            "password": password
        }
        dispatch(getUserRequest())
        
        axios.post(process.env.REACT_APP_USER_LOGIN, config)
        .then((res) => {
            let response = res.data.data.response
            let name = res.data.data.name
            
            if(response == true){
                let payload = {
                    isAuth :  true,
                    name : name,
                    email : email
                }
                dispatch(getUserSuccess(payload))
                
                console.log(payload);

                alert("Login Succefull")

                saveData("email", email)
                saveData("name", name)
                
                redirectPage()
        }})
        .catch ((err) => {
            alert("Login Failed")
            console.log(err);
            dispatch(getUserFailure(err))
        })
    }

    if(isAuth == true){
        return <Redirect to="/"/>
    }

    const redirectPage = () => {
        setTimeout(() => {
            history.push("/")
        }, 500);
    }

    return (
        <Grid container justify="center" className={styles.loginWrapper}>
            <Grid container justify="center" direction="column" md={6} sm={5} className={styles.commonGrid}>
                <p className={styles.siteName}>Uploder</p>
                <Typography variant="h5">
                    Easy to use file uploading service
                </Typography>
            </Grid>
            <Grid className={styles.loginCard} container align="center" direction="column" md={3} sm={5} xs={9}>
                
                <TextField 
                    id="outlined-primary" 
                    variant="outlined" 
                    required={true} 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Grid className={styles.space}/>
                <TextField 
                    id="outlined-primary" 
                    variant="outlined" 
                    required={true} 
                    label="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <Grid className={styles.space}/>

                <Button variant="contained" color="primary" onClick={handleClick}>Login</Button>

                <Box className={styles.divider}/>
                <Typography >
                Don't have an account ?
                </Typography>
                <Button className={classes.secondBtn} variant="contained" color="primary" onClick={() => {history.push("/registration")}}>Create Account</Button>
            </Grid>
            
        </Grid >
    )
}

export {Login}