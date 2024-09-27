export async function getRecipes(id){
    const url = id ? `/api/v1/recipes/${id}` : "/api/v1/recipes"
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