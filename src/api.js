import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    getDocs,
    getDoc,
    updateDoc,
    addDoc,
    setDoc,
    Timestamp,
    collection, 
    doc, 
    query, 
    where} from "firebase/firestore/lite";
import { 
    getAuth, 
    onAuthStateChanged,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDHBRY9HLDvltPTQyAXfEhEGQbbgACRgXU",
    authDomain: "cookjoy-00.firebaseapp.com",
    projectId: "cookjoy-00",
    storageBucket: "cookjoy-00.appspot.com",
    messagingSenderId: "426667455012",
    appId: "1:426667455012:web:4b4c9cc8584228ee8f9eb1"
  };


const  app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app)


export async function getDishTypes(){
    const  querySnapshot = await getDocs(collection(db, "dishTypes"));
    const dataArr = querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }))
    return dataArr
}
export async function getRecipesWithUsers(){
    const  querySnapshot = await getDocs(collection(db, "recipes"));
    const dataArr = querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }))
    const userIds = [...new Set(dataArr.map((recipe) => recipe.createId))];
    const usersSnap = await getDocs(query(collection(db, 'users'), where('__name__', 'in',userIds)));
    const users =Object.fromEntries(usersSnap.docs.map((doc) =>([doc.id, doc.data()])))
    
    return dataArr.map((recipe) => ({
        ...recipe,
        user: users[recipe.createId],
      }));
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

export async function getRecipeWithUser(recipeId) {
    // Fetch the recipe document
    const docRef = doc(db, 'recipes', recipeId);
    const recipeSnap = await getDoc(docRef);
  
    if (recipeSnap.exists()) {
      const recipe = recipeSnap.data();
      // Fetch the user profile
      const userRef = doc(db, 'users', recipe.createId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const user = userSnap.data();
        return { recipe, user };
      } else {
        throw { message: 'User not found'};
      }
    } else {
        throw { message: 'No such recipe exist'};
    }
  
    return null;
  }




export async function getCreateRecipes(){
    const q = query(collection(db, "recipes"), where('createId','==',auth.currentUser.uid));
    const  querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }))
    return dataArr
}

export async function loginUser({email, password}){
    try{
        const res =  await signInWithEmailAndPassword(auth, email, password)
        const data =  res.user
        return  data
    } catch(error){
        return error
    }

}

export async function signupUser({email, password, userName}) {

    try{
        const res =  await createUserWithEmailAndPassword(auth, email, password)
        const data =  res.user
        const resData = await updateProfile(data,{
            displayName: userName})
        const userData =  await setDoc(doc(db, "users", data.uid), {
            name: userName,
            photoURL: ""
          });
                    

        return  data
    }catch(error){
        return error
    }
}




export async function updateUserProfile(data) {
    const user = auth.currentUser;
    if (user !== null) {
    
    const newDisplayName = data.get('displayName')
    const newPhotoURL = data.get('photoURL');
    const userRef = doc(db, "users", user.uid);
   

  
    try{
        if(newDisplayName!==user.displayName || newPhotoURL!== user.photoURL){
            const resData = await updateProfile(user,{
                displayName: newDisplayName,
                photoURL: newPhotoURL}
            )
            const userData =  await updateDoc(userRef, {
                name: newDisplayName,
                photoURL: newPhotoURL
              });
            return {message:'Profile was successfully updated'}
        }
         return {message:'Profile is already up to date'}
    }catch(error){
        return error
    }

    }
}


export async function addNewRecipe(data) {
    const newTitle = data.get('title');
    const newServings = parseInt(data.get('servings'), 10);
    const newDishTypes  = data.getAll('dishTypes');
    const newDesc = data.get('description');
    const newIngredients = JSON.parse(data.get('ingredients'));
    // Get instructions, split by line breaks to create an array of steps
    const newInstructions = data.get('instructions').split('\n').map(step => step.trim()).filter(step => step);
  

    if (!newTitle || !newServings) {
        throw new Error("Title and servings are required.");
    }
    if(!newDishTypes){
        throw new Error("Choose at least one dish type.")
    }
    if(!newInstructions){
        throw new Error("Provide some steps to make this recipe.")
    }
    if(!newIngredients){
        throw new Error("Provide some ingredients to make this recipe.")
    }

    try {
        const docRef = await addDoc(collection(db, "recipes"), {
        title: newTitle,
        servings: newServings,
        createId: auth.currentUser.uid, 
        createdAt: Timestamp.now(),
        dishTypes: newDishTypes,
        description: newDesc,
        ingredients: newIngredients,
        instructions: newInstructions
        });

        return { success: true, id: docRef.id };
    } catch (e) {
        throw new Error(`Error adding document: ${e.message}`);
    }
      
}
export async function updateRecipe(recipeId, data){

    const recipeData = {
        title: data.get('title'),
        servings: parseInt(data.get('servings'), 10),
        description: data.get('description'),
        dishTypes: data.getAll('dishTypes') || [],
        ingredients: JSON.parse(data.get('ingredients')),
        instructions: data.get('instructions').split('\n').map(step => step.trim()).filter(step => step)
      };
      console.log({recipeData})

    if (!recipeId) {
        throw new Error("Recipe ID is required to update a recipe.");
    }
    try{
        const recipeRef =  doc(db, "recipes", recipeId);
        await updateDoc(recipeRef, recipeData);
        return { success: true, id: recipeRef.id };
    } catch(e){
        throw new Error(`Error updating document: ${e.message}`);
    }
}
