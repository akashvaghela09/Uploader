import { clearData, saveData } from '../utils/localStorage';
import { useDispatch } from 'react-redux';
import { getUserSuccess } from '../Redux/auth/action';
import { Button } from '@material-ui/core';

const Logout = () => {

    const dispatch = useDispatch()
    let payload = {
        isAuth: false,
        name: "",
        email: ""
    }

    const handleLogOut = () => {
        clearData()
        saveData("email", "guest")
        dispatch(getUserSuccess(payload))
    }

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleLogOut}>Log Out</Button>
        </>
    )
}

export {Logout}