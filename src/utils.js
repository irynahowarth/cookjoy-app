import { redirect } from "react-router-dom";

export async function requireAuth(request){
    const pathname = new URL(request.url).pathname 
    const isLoggedIn = localStorage.getItem("userLogin")

    if(!isLoggedIn){
        const res = redirect(
            `/login?message=Please login to proceed!&redirectTo=${pathname}`)
        res.body = true;
        throw res
    }
    return null
}