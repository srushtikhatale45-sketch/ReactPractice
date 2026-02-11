import React from 'react';
import Users from "./Component/Users/Users";
import { useState } from 'react';
function Example() {
    console.log("App rendered");
    const[users,setUsers]= useState([
        {id:1,firstName:"Srushti",lastName:"Khatale",age:21},
        {id:2,firstName:"Sakshi",lastName:"Mudgul",age:22},
        {id:3,firstName:"Riya",lastName:"Anthal",age:22},
        {id:4,firstName:"Radha",lastName:"Kadlag",age:21},
    ]);
    
    const increaseAge = (id)=>{
        console.log("increased Age",id);

        const newState = [];
        for(let user of users){
            if(user.id === id){
                newState.push({...user,age:user.age+1});
            }else{
                newState.push(user);
            }
        }
        setUsers(newState);
    };
    /*
    const increaseAge = (id)=>{
       setUsers((prevState)=>{
        return prevState.map((user)=>{
            if(user.id === id){
                return {...user,age:user.age+1};
            }else{
                return user;
            }
        });
       });
    };*/

    /*const deleteUser =(id)=>{
        setUsers((prevState)=>{
            return prevState.filter((user)=>{
                if(user.id!==id){
                    return user;
                }
            });
        });
    };
    */
    const deleteUser = (id)=>{
        setUsers((prevState)=>{
            return prevState.filter((user)=>user.id!=id);
        });
    };

  return (
    <div>
        <h1>State Example</h1>
        <Users users={users} increaseAge={increaseAge} deleteUser={deleteUser}/>
    </div>
  );
}

export default Example;