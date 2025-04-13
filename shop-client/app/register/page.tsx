'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function Page(){
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const handleClick = async() => {
        try {
            const res = await fetch('/api/auth/register',{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email,password})
            })
            if(res.ok){
                router.push('/login')
            }
         
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Register</h1>
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="text-black w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
            />
            <button
              onClick={handleClick}
              className="cursor-pointer w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      
    )
}