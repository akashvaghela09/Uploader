import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteFileFailure, deleteFileRequest, deleteFileSuccess} from '../Redux/app/action';

const DeletePage = () => {
    const dispatch = useDispatch()
    const [code, setCode] = useState("")
    const [adminCode, setAdminCode] = useState("")
    const delete_status = useSelector((state) => state.app.delete_status)
    const isLoading = useSelector((state) => state.app.isLoading)
    const isError = useSelector((state) => state.app.isError)
    
    const handleDelete = () => {
        dispatch(deleteFileRequest())

        axios.get(`https://api.gofile.io/deleteUpload?c=${code}&ac=${adminCode}`)
        .then((res)=> {
            dispatch(deleteFileSuccess(res.data.status))
        })
        .catch((err)=> {
            const serverErr = deleteFileFailure()
            dispatch(serverErr)
        })
    }

    
    return (
        <div>
            <h1>Delete</h1>
            <br/>
            <label>Code</label><br/>
            <input type="text" onChange={(e) => setCode(e.target.value)}/><br/><br/>
            <label>Admin Code</label><br/>
            <input type="text" onChange={(e) => setAdminCode(e.target.value)}/><br/><br/>
            <button onClick={handleDelete}>Delete</button><br/><br/>
            {
                isLoading && <h1>Loading ...</h1>
            }
            {
                isError && <h1>Something went wrong ...</h1>
            }
            {
                delete_status.length === 2 ? <h2>File Deleted</h2> : <h2>{delete_status}</h2>
            }
        </div>
    )
}

export {DeletePage}