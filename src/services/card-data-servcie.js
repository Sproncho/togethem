import {fb} from '../config/firebase-config';
import firebase from "firebase";
export async function uploadLot(title,description,soloPrice,amount,photoIDs,hashtags,uid){
    try{
        const collection = fb.firestore().collection("users").doc(uid).collection("lots");
        await collection.add({
            title,
            description,
            soloPrice,
            amount,
            photoIDs,
            hashtags
        })
    }catch(error){
        return Promise.reject(error);
    }
}