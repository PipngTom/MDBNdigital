import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from '../constants/userConstants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase-config';

export const register = ( email, password ) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST
        })

        const data = await createUserWithEmailAndPassword(auth, email, password)

        console.log(data)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error
        })
    }
}