import React from 'react'

const StateObject=()=>{
    const[person,setPerson]=useState({
        id:1,
        firstName:"Srushti",
        email:"srushtikhatale@gmail.com",
        phone:929132434,
        age:21,
    });
    const increaseAge=(e)=>{
        console.log("age updated!");
        setPerson((prevState)=>{
            return{...prevState,age:prevState.age+1};
        });
    }
  return (
    <div>
        <h1>Update State in Object</h1>
        <p>firstName:{person.firstName}</p>
        <p>lastName:{person.lastName}</p>
        <p>email:{person.email}</p>
        <p>phone:{person.phone}</p>
        <p>age:{person.age}</p>
        <button onClick={increaseAge}>Increase Age</button>
    </div>
  );
};

export default StateObject