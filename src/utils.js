import { redirect } from "react-router-dom";
import {useAuth}  from "../src/hooks/useAuth"

export async function requireAuth(request){
    const pathname = new URL(request.url).pathname 
    // const isLoggedIn = localStorage.getItem("userLogin")
    const {user} = useAuth();

    if(!user){
        const res = redirect(
            `/login?message=Please login to proceed!&redirectTo=${pathname}`)
        res.body = true;
        throw res
    }
    return null
}