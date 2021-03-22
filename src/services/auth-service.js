import { func } from 'prop-types';
import {fb} from '../config/firebase-config';

export  async function login(email,password){
    try{
        const response  = await fb.auth().signInWithEmailAndPassword(email,password);
        console.log(response);
    }catch(error){
       // console.log(error);
        Promise.reject(error);
    }
}

export function logout(){
    fb.auth().signOut(); 
}

export async function register(email, password){
    try{
        const response = await fb.auth().createUserWithEmailAndPassword(email,password);
        console.log(response);
    }catch(error){
        //console.log(error);
        Promise.reject(error);
    }
}

export async function setRole(role){
    try{
        const uid = fb.auth().currentUser.uid;
        const ref = fb.firestore().collection("users").doc(uid);
        const doc = await ref.get();
        if(doc.exists){
            await ref.update({
                role: role
            });
        }else{
            await ref.set({role: role},{merge: true});
        }
    }catch(error){
        Promise.reject(error);
    }
}