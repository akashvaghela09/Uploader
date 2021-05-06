import React, { useState } from 'react';
import axios from "axios"
import bcrypt from "bcryptjs"
import { useDispatch, useSelector } from 'react-redux';
import { getUserFailure, getUserRequest, getUserSuccess } from '../Redux/auth/action';
import { clearData, saveData } from '../utils/localStorage';

const Login = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const isAuth = useSelector((state) => state.auth.isAuth)
    const name = useSelector((state) => state.auth.name)
    
    const handleClick = () => {
        dispatch(getUserRequest())    
        axios.get(`https://uploderdb.herokuapp.com/users/?q=${email}`)
        .then((res) => {
            let hash = res.data.data[0].password
            // setName(res.data.data[0].name)
            bcrypt.compare(password, hash).then(function(result) {
                if(result == true){
                    let username = res.data.data[0].name
                    let payload = {
                        isAuth :  true,
                        name : username,
                        email : email
                    }
                    dispatch(getUserSuccess(payload))
                    
                    alert("Login Succefull")

                    saveData("email", email)
                    saveData("name", username)
                    console.log(isAuth);
                } else {
                    dispatch(getUserFailure())
                }
            });
        })
        .catch ((err) => {
            dispatch(getUserFailure(err))
        })
    }

    const handleLogout = () => {
        let payload = {
            isAuth: false,
            name: "",
            email: ""
        }
        clearData()
        dispatch(getUserSuccess(payload))
    }

    return (
        <div>
            <h1>Login Page</h1>
            {
                isAuth && <><button onClick={handleLogout}>LOG OUT</button><br/><br/></>
            }
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/><br/><br/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/><br/><br/>
            <button onClick={handleClick}>Check</button>
        </div>
    )
}

export {Login}