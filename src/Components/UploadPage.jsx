import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProgress, getServerFailure, getServerRequest, getServerSuccess, postFileFailure, postFileRequest, postFileSuccess } from '../Redux/app/action';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UploadPage = () => {
    const dispatch = useDispatch()
    const server_name = useSelector((state) => state.app.server_name)
    const progress = useSelector((state) => state.app.progress)
    const isError = useSelector((state) => state.app.isError)
    
    let [code, setCode] = useState("")
    let [adminCode, setAdminCode] = useState("")
    let [md5, setMD5] = useState("")
    let [fileName, setFileName] = useState("")
    let [directLink, setDirectLink] = useState("")

    let file;
    let formData = new FormData();

    const handleFileUpload = (e) => {
        file = e.target.files[0];
        formData.append("file", file);
    }
    
    const uploadToServer = () => {
        dispatch(postFileRequest())
       
        axios.post(`https://${server_name}.gofile.io/uploadFile`, formData, {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                dispatch(getProgress(percentCompleted))
            }
        }
        )
        .then((res)=> {
            setMD5(res.data.data.md5)
            setAdminCode(res.data.data.adminCode)
            setCode(res.data.data.code)
            setFileName(res.data.data.fileName)
            setDirectLink(res.data.data.directLink)

            const postFileAction = postFileSuccess(res.data.data)
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
        <div>
            <h1>Upload Page</h1>
            <input type="file" multiple={false} onChange={handleFileUpload} onClick={() => getActiveServer()}/><br/><br/>
            <button onClick={uploadToServer}>Upload</button><br/><br/>
            {
                progress > 0 && progress < 100 ? <progress value={progress} max="100"/> : null
            }
            {
                progress == 100 && <h2>File Uploaded</h2>
            }
            {
                isError && <h1>Something went wrong ...</h1>
            }
            {
                code && 
                <div>
                    <a href={directLink} target="_blank" rel="noopener noreferrer">Download</a><br/><br/>
                    <button onClick={() =>  navigator.clipboard.writeText(`http://localhost:3000/download/${code}/${md5}/${fileName}`)}>Copy Link</button>
                    <h2>Code: {code}</h2>
                    <h2>AdminCode: {adminCode}</h2>
                    <h2>md5: {md5}</h2>
                </div> 
            }
        </div>
    )
}

export {UploadPage}