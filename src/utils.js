import { redirect } from "react-router-dom";

export async function requireAuth(){
    const isLoggedIn = false

    if(!isLoggedIn){
        const res = redirect("/login")
        res.body = true;
        throw res
    }
}