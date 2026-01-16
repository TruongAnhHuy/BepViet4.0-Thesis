import { useEffect, useState } from "react"
import { getBlogs } from "../services/api";

export default function Blog(){
    const [blogs,setBlogs] = useState([]);
    
    useEffect(()=>{
        getBlogs()
        .then(data=>setBlogs(data))
        .catch(err=>console.error(err));
    },[]);
   
   
   return(
    <div>
        
      <h2>dday la trang blog</h2>
      
    </div>

)
}

