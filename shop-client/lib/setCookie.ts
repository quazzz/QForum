import { cookies } from "next/headers";
export async function setCookie(name: string,cookie: string){
    const cookieStore = await cookies()
    cookieStore.set(name,cookie)
    return 0 
}