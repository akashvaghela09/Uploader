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
        GET_PROGRESS,
        DELETE_FILE_SUCCESS,
        DELETE_FILE_FAILURE,
        DELETE_FILE_REQUEST,
        GET_FILE_LIST_REQUEST,
        GET_FILE_LIST_SUCCESS,
        GET_FILE_LIST_FAILURE
} from './actionType'

const initialState = {
    isLoading: false,
    isError: false,
    server_name: "",
    download_url: "",
    progress: 0,
    delete_status: "",
    fileData: "",
    fileList: []
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
                fileData: payload,
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
        case GET_FILE_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_FILE_LIST_SUCCESS:
            return {
                isLoading: false,
                fileList: payload,
                isError: false
            }
        case GET_FILE_LIST_FAILURE:
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
                isError: false
            }
        case DELETE_FILE_SUCCESS:
            return {
                delete_status: payload,
                isLoading: false,
                isError: false
            }
        case DELETE_FILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case DELETE_FILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        default:
            return state
    }
}

export {reducer}