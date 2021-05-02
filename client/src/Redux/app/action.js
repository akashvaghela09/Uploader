import { POST_FILE_REQUEST,
        POST_FILE_SUCCESS,
        POST_FILE_FAILURE,
        GET_SERVER_REQUEST,
        GET_SERVER_SUCCESS,
        GET_SERVER_FAILURE,
        GET_FILE_REQUEST,
        GET_FILE_SUCCESS,
        GET_FILE_FAILURE,
        GET_PROGRESS,
        DELETE_FILE_REQUEST,
        DELETE_FILE_SUCCESS,
        DELETE_FILE_FAILURE
} from '../app/actionType'

const getServerRequest = () => {
    return {
        type: GET_SERVER_REQUEST        
    }
}

const getServerSuccess = (payload) => {
    return {
        type: GET_SERVER_SUCCESS,
        payload
    }
}

const getServerFailure = () => {
    return {
        type: GET_SERVER_FAILURE        
    }
}

const getFileRequest = () => {
    return {
        type: GET_FILE_REQUEST        
    }
}

const getFileSuccess = (payload) => {
    return {
        type: GET_FILE_SUCCESS,
        payload
    }
}

const getFileFailure = () => {
    return {
        type: GET_FILE_FAILURE        
    }
}

const postFileRequest = () => {
    return {
        type: POST_FILE_REQUEST     
    }
}

const postFileSuccess = (payload) => {
    return {
        type: POST_FILE_SUCCESS,
        payload
    }
}

const postFileFailure = () => {
    return {
        type: POST_FILE_FAILURE        
    }
}

const getProgress = (payload) => {
    return {
        type: GET_PROGRESS,
        payload
    }
}

const deleteFileRequest = () => {
    return {
        type: DELETE_FILE_REQUEST     
    }
}

const deleteFileSuccess = (payload) => {
    return {
        type: DELETE_FILE_SUCCESS,
        payload
    }
}

const deleteFileFailure = () => {
    return {
        type: DELETE_FILE_FAILURE        
    }
}

export { getFileRequest,
    getFileSuccess,
    getFileFailure,
    getServerSuccess,
    getServerRequest,
    getServerFailure,
    postFileRequest,
    postFileSuccess,
    postFileFailure,
    getProgress,
    deleteFileRequest,
    deleteFileSuccess,
    deleteFileFailure
}