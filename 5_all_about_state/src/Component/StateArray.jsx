import React from 'react'
import{v4 as uuid} from "uuid";

const StateArray=()=> {
    const[fruits,setFruits]=useState(["Apple","Mango"]);
    const handleAdd=()=>{
        setFruits(fruits.push("newFruit"));//cannot mutate state directly
         setFruits(...fruits,"newFruit");//cannot mutate state directly
         setFruits((prevState)=>{
            return[...prevState,"newFruit"];
         });//Update state using callback

    };
  return (
    <div>
        <h1>Update state in Arrays</h1>
        <ol>
            {fruits.map((fruit)=>(
                <li key={uuid()}>{fruits}</li>
            ))}
        </ol>
        <button onClick={handleAdd}>Add Fruit</button>
    </div>
  )
}

export default StateArray