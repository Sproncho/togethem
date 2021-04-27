const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

admin.initializeApp(functions.config().firbase);

exports.addFirestoreDataToAlgolia = functions.https.onRequest((req,res) => {
    admin.firestore().collection("lots").get().then(docs =>{
        docs.forEach(doc => {
            
        })
    })
})