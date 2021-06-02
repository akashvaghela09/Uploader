import { GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILURE
} from '../auth/actiontype'

const initialState = {
    isAuth: false,
    name: "",
    email: "",
    isError: false,
    isLoading: false
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case POST_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case POST_USER_SUCCESS:
            return {
                isAuth: payload,
                isLoading: false,
                isError: false
            }
        case POST_USER_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_USER_SUCCESS:
            return {
                isAuth: payload.isAuth,
                name: payload.name,
                email: payload.email,
                isLoading: false,
                isError: false
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

export {reducer}