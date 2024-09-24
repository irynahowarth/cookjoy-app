export async function getRecipes(id){
    const url = id ? `api/recipes/${id}` : "api/recipes"
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