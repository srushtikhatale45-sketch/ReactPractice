import React from 'react';
import Barcode from 'react-barcode';

const BarcodeWrapper = ({ value }) => {
  return (
    <div className="-rotate-90 whitespace-nowrap">
      <Barcode 
        value={value || "EMPTY"} 
        displayValue={false} 
        height={40} 
        width={1.5} 
        background="transparent" 
      />
    </div>
  );
};

export default BarcodeWrapper;