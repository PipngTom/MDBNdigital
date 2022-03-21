import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from '../constants/userConstants';

export const registerReducer = (state = { info: null }, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                loading: true,
                info: null
            }
        case REGISTER_SUCCESS:
            return {
                loading: false,
                info: action.payload
            }
        case REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}