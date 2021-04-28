const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");
const ALGOLIA_APPID="JAX15V0HJY";
const ALGOLIA_ADMIN_KEY="b977b39fbab81e855d11a01ac7f1e1e4";
const ALGOLIA_INDEX_NAME="dev_togethem";    
admin.initializeApp(functions.config().firbase);
var client = algoliasearch(ALGOLIA_APPID,ALGOLIA_ADMIN_KEY);
var index = client.initIndex(ALGOLIA_INDEX_NAME);
exports.addFirestoreDataToAlgolia = functions.https.onRequest((req, res) => {
    var arr = [];
    admin.firestore().collection("lots").get().then(docs =>{
        docs.forEach(doc => {
            let lot = doc.data();
            lot.objectID = doc.id;

            arr.push(lot);

        })

     
        return index.saveObjects(arr).then(() => {
            console.log('Documents imported into Algolia');
            return true;
        }).catch(err => {
            console.error('Error when importing documents into Algolia', err);
            return true;
        });
    }).catch(err => {
        console.log('Error getting the chats collection', err)
    })
})

exports.addLotTOIndex = functions.firestore.document('lots/{lotsId}').onCreate(snapshot => {
    const data = snapshot.data();
    data.objectID = snapshot.id;
    return index.saveObject(data);
});

exports.updateLotInIndex= functions.firestore.document('lots/{lotsId}').onUpdate(change => {
    const newData = change.after.data();
    newData.objectID = change.after.id;
    return index.saveObject(newData);
});

exports.deletePostFromIndex = functions.firestore.document('lots/{lotsId}').onDelete(snapshot => {
    index.deleteObject(snapshot.id)
});