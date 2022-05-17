import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA6Dorc4cx28oqz8boBsQiiNsgCY79K5OQ",
    authDomain: "photo-expor.firebaseapp.com",
    projectId: "photo-expor",
    storageBucket: "photo-expor.appspot.com",
    messagingSenderId: "168916897541",
    appId: "1:168916897541:web:457f2f77ff96c0863cf16c"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);



export default async function UploadImage(params) {

    const storageRef = ref(storage, `${params.albumName}/${params.filename}`);

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", params.uri, true);
        xhr.send(null);
    });

    //const ref = firebase.storage().ref('/products').child((Date.now()).toString());
    //const snapshot = await ref.put(blob);

    uploadBytes(storageRef, blob).then((snapshot) => {

        //const pathReference = ref(storage, 'images/stars.jpg');
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            //console.log('File available at', downloadURL);
            let response = {
                index: params._index,
                name: params.filename,
                url: downloadURL,
                selected: false
            }
            params.callback(response)
            return(downloadURL);
        });
        
    });

    blob.close();

}
