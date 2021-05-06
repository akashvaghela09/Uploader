import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteFileFailure, deleteFileRequest, deleteFileSuccess, getFileListFailure, getFileListRequest, getFileListSuccess} from '../Redux/app/action';
import { loadData } from '../utils/localStorage';

const DeletePage = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.app.isLoading)
    const isError = useSelector((state) => state.app.isError)
    const [fileList, setFileList] = useState([])
    const email = loadData("email")

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
        // dispatch(getFileListSuccess(newData))
        setFileList(newData)

        // getList()
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
    useEffect(() => {


        if(email !== "guest"){
            getList()
        }
    }, []);
    return (
        <div>
            <h1>Delete</h1>
            <br/>
            {
                fileList ? fileList.map((el) => <button onClick={() => handleDelete(el.code, el.adminCode, el._id)} key={el.code+"_"+el.adminCode}>File</button>) : null
            }
            {
                isLoading && <h1>Loading ...</h1>
            }
            {
                isError && <h1>Something went wrong ...</h1>
            }
        </div>
    )
}

export {DeletePage}