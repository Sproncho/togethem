import { func } from 'prop-types';
import {fb} from '../config/firebase-config';
import firebase from "firebase";
var uid;
export  async function login(email,password){
    try{
        const response  = await fb.auth().signInWithEmailAndPassword(email,password);
        uid = fb.auth().currentUser.uid;
        return response;
    }catch(error){
        return Promise.reject(error);
    }
}

export function logout(){
    fb.auth().signOut(); 
}

export async function register(email, password){
    try{
        const response = await fb.auth().createUserWithEmailAndPassword(email,password);
        console.log("uid setted");
        uid = fb.auth().currentUser.uid;
        return response;
    }catch(error){
        return  Promise.reject(error);
    }
}

export async function setRoleandNickName(role,nickname,email){
    try{
        console.log("EMAIL",email);
        const ref = fb.firestore().collection("users").doc(uid);
        const doc = await ref.get();
        if(doc.exists){
            await ref.update({
                role: role,
                nickname: nickname,
                email:email
            });
        }else{
            await ref.set({role: role,nickname: nickname, email:email},{merge: true});
        }
    }catch(error){
        return Promise.reject(error);
    }
}
export async function getUserInfo(uid){
    try{
        const doc = await fb.firestore().collection("users").doc(uid).get();
        return doc.data();
    }catch(error){
        return Promise.reject(error);
    }
}
export async function changeUserame(uid,newUsername){
    try{
        const ref = fb.firestore().collection("users").doc(uid);
        await ref.update({
            nickname: newUsername
        })
    }catch(error){
        return Promise.reject(error);
    }
}

export async function changePassword(oldPassword, newPassword){
    try{
        const user = await fb.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email,oldPassword);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPassword);
    }catch(error){
        return Promise.reject(error);
    }
}