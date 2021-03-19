import {fb} from '../config/firebase-config';

export  async function login(email,password){
    try{
        const response  = await fb.auth().signInWithEmailAndPassword(email,password);
        console.log(response);
    }catch(error){
        console.log(error);
    }
}

export function logout(){
    fb.auth().signOut(); 
}