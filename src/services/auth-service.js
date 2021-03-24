import { func } from 'prop-types';
import {fb} from '../config/firebase-config';
var uid;
export  async function login(email,password){
    try{
        const response  = await fb.auth().signInWithEmailAndPassword(email,password);
        console.log(response);
        uid = fb.auth().currentUser.uid;
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
        console.log("uid setted");
        uid = fb.auth().currentUser.uid;
    }catch(error){
      //  console.log(error);
        return  Promise.reject(error);
    }
}

export async function setRoleandNickName(role,nickname){
    try{
        const ref = fb.firestore().collection("users").doc(uid);
        const doc = await ref.get();
        if(doc.exists){
            await ref.update({
                role: role,
                nickname: nickname
            });
        }else{
            await ref.set({role: role,nickname: nickname},{merge: true});
        }
    }catch(error){
        return Promise.reject(error);
    }
}