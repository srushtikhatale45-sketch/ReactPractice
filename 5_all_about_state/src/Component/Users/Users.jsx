import React from 'react';
import {v4 as uuid} from "uuid";
import "./user.css";
import User from "./User";
const Users =({users,increaseAge,deleteUser})=>{
    console.log("Users Redenered",users);
  return (
    <div>
        <ul>
            {users
            ? users.map((user)=>(
                <User 
                {...user}
                key={user.id}
                increaseAge={ increaseAge}
                deleteUser={deleteUser}/>
            ))
           :"" }
        </ul>
    </div>
    
  );
};

export default Users