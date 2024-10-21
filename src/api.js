import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyDHBRY9HLDvltPTQyAXfEhEGQbbgACRgXU",
    authDomain: "cookjoy-00.firebaseapp.com",
    projectId: "cookjoy-00",
    storageBucket: "cookjoy-00.appspot.com",
    messagingSenderId: "426667455012",
    appId: "1:426667455012:web:4b4c9cc8584228ee8f9eb1"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export async function getRecipes(){
    const  querySnapshot = await getDocs(collection(db, "recipes"));
    const dataArr = querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }))
    console.log(dataArr)
    return dataArr
}
// export async function getRecipes(id){
//     const url = id ? `/api/v1/recipes/${id}` : "/api/v1/recipes"
//     const res  = await fetch(url);
//     if(!res.ok){
//         throw{
//             message: "Failed to fetch recipes",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json();
//     return data.recipes;
// }


export async function getCreateRecipes(id){
    const url = id ? `/api/v1/create/recipes/${id}` : "/api/v1/create/recipes"
    const res  = await fetch(url);
    if(!res.ok){
        throw{
            message: "Failed to fetch recipes",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.recipes;
}

export async function loginUser(cred){
    const res = await fetch("/api/v1/login",
        {method: "post", body: JSON.stringify(cred)}
    )
    const data = await res.json()

    if(!res.ok){
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    return data
}