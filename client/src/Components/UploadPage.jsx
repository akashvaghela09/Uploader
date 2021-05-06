import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProgress, getServerFailure, getServerRequest, getServerSuccess, postFileFailure, postFileRequest, postFileSuccess } from '../Redux/app/action';
import axios from 'axios';
import { loadData, saveData } from '../utils/localStorage';

const UploadPage = () => {
    const dispatch = useDispatch()
    const server_name = useSelector((state) => state.app.server_name)
    const progress = useSelector((state) => state.app.progress)
    const isError = useSelector((state) => state.app.isError)
    const fileData = useSelector((state) => state.app.fileData)
    saveData("email", "akash")

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
                fileData && 
                <div>
                    <a href={fileData.directLink} target="_blank" rel="noopener noreferrer">Download</a><br/><br/>
                    <button onClick={() =>  navigator.clipboard.writeText(fileData.downloadPage)}>Copy Link</button>
                    <h2>Code: {fileData.code}</h2>
                    <h2>AdminCode: {fileData.adminCode}</h2>
                </div> 
            }
        </div>
    )
}

export {UploadPage}