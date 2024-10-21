import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    getDocs,
    getDoc,
    collection, 
    doc, 
    query, 
    where} from "firebase/firestore/lite";

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
    return dataArr
}
// get single document by id from recipes collection 
export async function getRecipe(id) {
    const docRef = doc(db, 'recipes', id)
    const recipeSnap = await getDoc(docRef)
    if(!recipeSnap.exists()) {
       throw {
            message: 'No such recipe exist'
        }
    }
    return {
        ...recipeSnap.data(), 
        id: recipeSnap.id
    }
}

export async function getCreateRecipes(){
    const q = query(collection(db, "recipes"), where('createId','==','111'));
    const  querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }))
    return dataArr
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