'use client'
import { useRouter } from "next/navigation"
export default function Page(){
    const router = useRouter()
    const handleClick = async() => {
        try {
            const res = await fetch('/api/stripe/checkout', {method: 'POST'})
            const json = await res.json()
            router.push(json.url)
            console.log(json)
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <>
        <button onClick={() => handleClick()}>Click me pls</button>
        </>
    )
}