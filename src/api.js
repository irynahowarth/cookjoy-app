export async function getRecipes(){
    const res  = await fetch("api/recipes");
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