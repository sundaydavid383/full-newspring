import { useEffect, useState } from "react";
const Test = () => {
const [query, setQuery] = useState("");
const [debugQuery, setDebugQuery] = useState("")
useEffect(() => {
 const interval = setTimeout(() => {
    setDebugQuery(query)
  }, 5000);
 
 return () => {
   clearInterval(interval)
  }
}, [query])

useEffect(() => {
    if(debugQuery){
        console.log("this is ", debugQuery)
       }
    console.log(debugQuery)
 
}, [debugQuery])
  return (
    <>
    <input type="" placeholder="Holy frie burn upon my altar"  onChange={(e)=>{setQuery(e.target.value)}} /></>
  )
}

export default Test
