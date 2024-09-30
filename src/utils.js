import { redirect } from "react-router-dom";

export async function requireAuth(){
    const isLoggedIn = localStorage.getItem("userLogin")

    if(!isLoggedIn){
        const res = redirect("/login?message=Please login to proceed!")
        res.body = true;
        throw res
    }
    return null
}