import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProgress, getServerFailure, getServerRequest, getServerSuccess, postFileFailure, postFileRequest, postFileSuccess } from '../Redux/app/action';
import axios from 'axios';

const UploadPage = () => {
    const dispatch = useDispatch()
    const server_name = useSelector((state) => state.app.server_name)
    const progress = useSelector((state) => state.app.progress)
    let formData = new FormData();

    const handleFileUpload = (e) => {
        let file = e.target.files[0];
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
            let postResponse = {
            "fileName" : res.data.data.fileName,
            "downloadPage" : res.data.data.downloadPage,
            "directLink" : res.data.data.directLink,
            "adminCode" : res.data.data.adminCode,
            "code" : res.data.data.code,
            }

            const postFileAction = postFileSuccess(postResponse)
            dispatch(postFileAction)

            console.log(`File Uploaded on "${server_name}" Server`);
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
    
    
    useEffect(() => {
        getActiveServer()
    }, []);

    return (
        <div>
            <h1>Upload Page</h1>
            <input type="file" multiple={false} onChange={handleFileUpload}/><br/><br/>
            <button onClick={uploadToServer}>Upload</button><br/><br/>
            <progress value={progress} max="100"/>
            {/* <button onClick={() =>  navigator.clipboard.writeText(server_name)}>Copy Link</button> */}
        </div>
    )
}

export {UploadPage}