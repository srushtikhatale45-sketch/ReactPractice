import React from 'react'

const Counter=()=>{
    const [count,setCount]=useSate(0);

    const handleIncrease=(e)=>{
        setCount((count)=>count+1);
    };
    const handleDecrease=(e)=>{
        setCount((count)=>count-1);
    };
    const handleReset=(e)=>{
        setCount(0);
    };

  return (
    <div>
        <button onClick={handleIncrease}>Increase</button>
        <div>Count:{count}</div>
        <button onClick={handleDecrease}>Decrease</button>
        <br />
        <button onClick={handleReset}>Reset</button>

    </div>
  );
};

export default Counter