import { GET_USER_REQUEST,
        GET_USER_SUCCESS,
        GET_USER_FAILURE,
        POST_USER_REQUEST,
        POST_USER_SUCCESS,
        POST_USER_FAILURE
} from '../auth/actiontype'

const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST        
    }
}

const getUserSuccess = (payload) => {
    return {
        type: GET_USER_SUCCESS,
        payload
    }
}

const getUserFailure = () => {
    return {
        type: GET_USER_FAILURE        
    }
}


const postUserRequest = () => {
    return {
        type: POST_USER_REQUEST        
    }
}

const postUserSuccess = (payload) => {
    return {
        type: POST_USER_SUCCESS,
        payload
    }
}

const postUserFailure = () => {
    return {
        type: POST_USER_FAILURE        
    }
}

export { getUserRequest,
    getUserSuccess,
    getUserFailure,
    postUserRequest,
    postUserSuccess,
    postUserFailure
}