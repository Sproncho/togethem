import {fb} from '../config/firebase-config';
import firebase from "firebase";
import { func } from 'prop-types';
export async function uploadLot(title,description,soloPrice,amount,photoIDs,hashtags,uid){
    try{
        const collection = fb.firestore().collection("users").doc(uid).collection("lots");
        await collection.add({
            title,
            description,
            soloPrice,
            amount,
            photoIDs,
            hashtags,
            sellerId:uid
        })
    }catch(error){
        return Promise.reject(error);
    }
}

export async function getLots(uid){
    try{
        const collection = await fb.firestore().collection("users").doc(uid).collection("lots").get();
        const lots = collection.docs.map(doc => { return {...doc.data(),id:doc.id}})
        console.log(lots);
        return lots; 
    }catch(error){
        Promise.reject(error);
    }
}

export async function getLotById(uid,id){
    try{
        const lot = await fb.firestore().collection("users").doc(uid).collection("lots").doc(id).get();
        console.log({...lot.data(),id:id});
    }catch(error){
        Promise.reject(error);
    }
}