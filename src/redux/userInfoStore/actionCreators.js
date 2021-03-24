import Types from './actionTypes'

export  function setUID(UID){
    return{
        type:Types.setUID,
        payload:{
            UID
        }
    };
}

export function setRole(role){
    return{
        type:Types.setRole,
        payload:{
            role
        }
    }
}