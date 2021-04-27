import {fb} from '../config/firebase-config';
import firebase from "firebase";
import { func } from 'prop-types';

export async function uploadLot(title,description,soloPrice,totalAmount,photoIDs,hashtags,uid){
    try{
        const ref = fb.firestore().collection("users").doc(uid);
        const collection = fb.firestore().collection("lots");
        const response = await collection.add({
            title,
            description,
            soloPrice,
            totalAmount,
            amount:0,
            photoIDs,
            hashtags,
            sellerId:uid,
            finished:false
        })
        console.log("response is",response.id);
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
        const lots = collection.docs.map(doc => { return{ ...doc.data(),id:doc.id}})
        console.log(lots);
        return lots; 
    }catch(error){
        return Promise.reject(error);
    }
}

export async function getMyLots(uid){
    try{
        const lotsIds = (await fb.firestore().collection("users").doc(uid).get()).data().lotsIds;
        var lots = [];
        if(!lotsIds){
            return lots;
        }
        // lotsIds.forEach(async id =>{
        //     var lot = (await fb.firestore().collection("lots").doc(id).get()).data();
           
        //     lots.push(lot);
        // })
        console.log("My lots:",lots);
        for(let i = 0; i < lotsIds.length; i++){
            var lot = (await fb.firestore().collection("lots").doc(lotsIds[i]).get()).data();
            lots.push({...lot,id:lotsIds[i]});
        }
        console.log(lotsIds);
        return lots;
        // return lotsIds;
    }catch(error){
        return Promise.reject(error);
    }
}


export async function getLotById(id){
    try{
        const lot = await fb.firestore().collection("lots").doc(id).get();
        console.log({...lot.data(),id:id});
        return {...lot.data(),id:id};
    }catch(error){
        return Promise.reject(error);
    }
}
export async function deleteLotByid(uid,id){
    try{
        const deleted = await fb.firestore().collection("lots").doc(id).delete();
        const ref = fb.firestore().collection("users").doc(uid);
        await ref.update({
            lotsIds:firebase.firestore.FieldValue.arrayRemove(id)
        })
        return deleted;
    }catch(error){
        return Promise.reject(error);
    }
}


export async function checkBuying(uid,id){
    const doc =  await fb.firestore().collection("lots").doc(id).collection("buyers").doc(uid).get();
    if(doc.exists){
        console.log("купил уже");
        return true;
    }else{
        console.log("еще не купил");
        return false;
    }
}

export async function subscribeOnLot(uid,id,amount){
    try{
        const isBought =await checkBuying(uid,id)
        if(isBought){
            throw "already bought";
        }

        const lot = await getLotById(id);

        console.log("Gotted lot:",lot,"id of lot: ",id);

        if(lot.amount + amount > lot.totalAmount){
            throw "too big number";
        }

        

        const collection = fb.firestore().collection("lots").doc(id).collection("buyers");
        await collection.doc(uid).set({amount});
        const lotRef = fb.firestore().collection("lots").doc(id);
        if(lot.amount + amount === lot.totalAmount){
            await lotRef.update({//need testing
                finished:true
            }) 
        }

        await lotRef.update({
            amount:firebase.firestore.FieldValue.increment(amount)
        }) 


        const userRef =  fb.firestore().collection("users").doc(uid);
        await userRef.update({
            groupIds:firebase.firestore.FieldValue.arrayUnion(id)
        })
    }catch(error){
        return Promise.reject(error);
    }
}

export async function unsubscribeFromLot(uid,id){
    const ref =  fb.firestore().collection("lots").doc(id).collection("buyers").doc(uid);
    const amount =  (await ref.get()).data().amount;
    console.log("AMOUNT", amount);
    await ref.delete();
    const lotRef = fb.firestore().collection("lots").doc(id);
    await lotRef.update({
        amount:firebase.firestore.FieldValue.increment(-amount),
        finished:false
    })
}
export async function getMyGroups(uid){
    try{
        const lotsIds = (await fb.firestore().collection("users").doc(uid).get()).data().groupIds;
        var lots = [];
        for(let i = 0; i < lotsIds.length; i++){
           var lot = (await fb.firestore().collection("lots").doc(lotsIds[i]).get()).data();
           lots.push({...lot,id:lotsIds[i]});
        }
        console.log(lots);
        return lots;
    }catch(error){
        return Promise.reject(error);
    }
}