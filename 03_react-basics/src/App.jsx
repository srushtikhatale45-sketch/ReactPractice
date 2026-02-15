import React from 'react'
import Home from './components/Home';
import FirstComponent from './components/FirstComponent';

const App=()=>{
  // rfce
  // raf
  //rfc
  const names = ["Srushti","abc","xyz","hgjf"];

  return (
    <div>
     <Home namesProps={names}/>
     <FirstComponent/>
    </div>
  );
}

export default App