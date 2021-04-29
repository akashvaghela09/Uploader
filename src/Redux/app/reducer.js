import { 
    POST_FILE_REQUEST,
        POST_FILE_SUCCESS,
        POST_FILE_FAILURE,
        GET_SERVER_REQUEST,
        GET_SERVER_SUCCESS,
        GET_SERVER_FAILURE,
        GET_FILE_REQUEST,
        GET_FILE_SUCCESS,
        GET_FILE_FAILURE,
        GET_PROGRESS
} from './actionType'

const initialState = {
    isLoading: false,
    isError: false,
    server_name: "",
    upload_url: "",
    download_url: "",
    progress: 0
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case POST_FILE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case POST_FILE_SUCCESS:
            return {
                upload_url: payload,
                isLoading: false,
                isError: false
            }
        case POST_FILE_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        case GET_FILE_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_FILE_SUCCESS:
            return {
                isLoading: false,
                download_url: payload,
                isError: false
            }
        case GET_FILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case GET_SERVER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_SERVER_SUCCESS:
            return {
                isLoading: false,
                server_name: payload,
                isError: false
            }
        case GET_SERVER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case GET_PROGRESS:
            return {
                progress: payload,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

export {reducer}