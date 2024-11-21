import { redirect } from "react-router-dom";

export async function requireAuth(request){
    const pathname = new URL(request.url).pathname 
    const isLoggedIn = localStorage.getItem("user")

    if(!isLoggedIn){
        const res = redirect(
            `/login?message=Please login to proceed!&redirectTo=${pathname}`)
        res.body = true;
        throw res
    }
    return null
}



export function formatDate(date) {
    const options = {
      weekday:"short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }