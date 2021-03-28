import Types from './actionTypes'

const init = {
    UID:'',
    role:'',
    init: false
}

export default function userInfoReducer(state = init,{type,payload}){
    switch(type){
        case Types.setRole:
            return{
                ...state,
                role:payload.role
            }
        case Types.setUID:
            return{
                ...state,
                UID:payload.UID
            }
        case Types.setInit:
            return{
                ...state,
                init:true
            }
        default: return state;
    }
}