import { 
    CLEAR_PROFILE, 
    GET_PROFILE, 
    GET_PROFILES, 
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS
 } from "../actions/types";

const initialState = {
    profile: null, 
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state=initialState, action){
    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_REPOS:
            return{
                ...state,
                repos: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}