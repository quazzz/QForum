"use client"
import React, { unstable_useSwipeTransition } from "react"
import { useEffect, useState } from "react"
export default function Page(){
    const [val,setVal] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch('/api/test')
            const json = await res.json()
            console.log(json.message)
            setVal(json.message)
        }
        fetchdata()
     
    }, [])
    return(
        <h1>{val}</h1>
    )
}