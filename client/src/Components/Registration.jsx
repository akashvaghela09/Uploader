import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { postUserFailure, postUserRequest, postUserSuccess } from '../Redux/auth/action';
import { useHistory } from "react-router-dom";

const Registration = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => {
        let userData = {
            "name": name,
            "email": email,
            "password": password
        }

        dispatch(postUserRequest())
        axios.post(`https://uploderdb.herokuapp.com/users`, userData)
        .then((res) => {
            dispatch(postUserSuccess())
            console.log(res);
            redirectToLogin()
        }).catch = (err) => {
            dispatch(postUserFailure())
        }
    }

    const redirectToLogin = () => {
        setTimeout(() => {
            history.push("/login");
        }, 3000);
    }

    return (
        <div>
            <h1>Registration</h1><br/>
            <input type="text" value={name} placeholder="enter Name" onChange={(e) => setName(e.target.value)}/><br/><br/>
            <input type="text" value={email} placeholder="enter Email" onChange={(e) => setEmail(e.target.value)}/><br/><br/>
            <input type="text" value={password} placeholder="enter Password" onChange={(e) => setPassword(e.target.value)}/><br/><br/>
            <button onClick={handleClick}>Register</button>
        </div>
    )
}

export {Registration}