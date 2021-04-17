import {fb} from '../config/firebase-config';
import firebase from "firebase";
import { func } from 'prop-types';
export async function uploadLot(title,description,soloPrice,amount,photoIDs,hashtags,uid){
    try{
        const ref = fb.firestore().collection("users").doc(uid);
        const collection = fb.firestore().collection("lots")
        const response = await collection.add({
            title,
            description,
            soloPrice,
            amount,
            photoIDs,
            hashtags,
            sellerId:uid
        })
        console.log("response is",response.id);
        const doc = await ref.get();
        await ref.update({
            lotsIds:firebase.firestore.FieldValue.arrayUnion(response.id)
        })
    }catch(error){
        return Promise.reject(error);
    }
}

export async function getLots(){
    try{
        const collection = await fb.firestore().collection("lots").get();
        const lots = collection.docs.map(doc => { return doc.data()})
        console.log(lots);
        return lots; 
    }catch(error){
        Promise.reject(error);
    }
}

export async function getMyLots(uid){
    try{
        const lotsIds = (await fb.firestore().collection("users").doc(uid).get()).data().lotsIds
        var lots = [];
        lotsIds.forEach(async id =>{
            var lot = (await fb.firestore().collection("lots").doc(id).get()).data();
            lots.push(lot);
        })
        return lots
    }catch(error){

    }
}


export async function getLotById(id){
    try{
        const lot = await fb.firestore().collection("lots").doc(id).get();
        console.log({...lot.data(),id:id});
    }catch(error){
        Promise.reject(error);
    }
}