import { useEffect, useState } from "react";
const Test = () => {
const [query, setQuery] = useState("");
const [debugQuery, setDebugQuery] = useState("")
useEffect(() => {
 const interval = setTimeout(() => {
    setDebugQuery(query)
  }, 5001);

 
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
const handleFileToBase64 = (file) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result;
    console.log("Base64 Video String:", base64String);
    // You can now use the string or set it to state
  };

  reader.readAsDataURL(file);
};


  return (
    <div style={{marginTop: "200px"}}>
   
    <input type="file" name="" id="" onChange={(e)=>{const file = e.target.files[0];
      if(file)handleFileToBase64(file)}} />
    <input type="" placeholder="Holy frie burn upon my altar"  onChange={(e)=>{setQuery(e.target.value)}} /></div>
  )
}

export default Test
