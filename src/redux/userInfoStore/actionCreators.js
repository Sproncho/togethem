import Types from './actionTypes'
import {fb} from '../../config/firebase-config'

export  function setUID(UID){
    return{
        type:Types.setUID,
        payload:{
            UID
        }
    };
}


//  export function setUID(){
//     return dispatch =>{
//         fb.auth().then(response => {
//             dispatch({
//                 type:Types.setUID,
//                 payload:{
//                     UID: response.currentUser.U
//                 }
//             })
//         })
//     }
// }

export function setRole(role){
    return{
        type:Types.setRole,
        payload:{
            role
        }
    }
}

export function setInit(){
    return{
        type:Types.setInit,
    }
}