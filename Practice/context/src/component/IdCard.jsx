import React from 'react';
import BarcodeWrapper from './Barcode';

const IdCard = ({ data = {} }) => {
  const { 
    firstName = 'First Name', 
    lastName = 'Last Name', 
    designation = 'DESIGNATION', 
    issue = '02/02/2017', 
    expires = '02/02/2018', 
    address = 'Street, City', 
    phone = '+2222 222 1111', 
    barcode = 'ID-987654321', 
    photo = null 
  } = data;

  return (
    <section className="sticky top-10">
      <div className="w-[550px] h-[320px] bg-blue-200 rounded-2xl shadow-2xl flex overflow-hidden relative border-4 border-white">
        
        {/* Left Barcode Strip */}
        <div className="w-20 flex items-center justify-center bg-blue-300/30">
          <BarcodeWrapper value={barcode} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 flex gap-6">
          {/* Photo Box */}
          <div className="w-40 h-[200px] bg-slate-800 text-white flex flex-col items-center justify-center text-center rounded-lg overflow-hidden border-2 border-slate-700">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-[10px] uppercase tracking-widest opacity-60">
                <p>Photo Size</p>
                <p>1.2 x 1.4 in</p>
              </div>
            )}
          </div>

          {/* Details Table */}
          <div className="flex-1 text-blue-900">
            <h2 className="text-2xl font-black uppercase leading-tight italic">{firstName}, {lastName}</h2>
            <p className="text-sm font-bold tracking-[0.2em] mb-4 text-blue-700">{designation}</p>
            
            <div className="grid grid-cols-[80px_1fr] gap-y-2 text-sm">
              <span className="font-black">ISSUE:</span> <span>{issue}</span>
              <span className="font-black">EXPIRES:</span> <span>{expires}</span>
              <span className="font-black">ADDRESS:</span> <span className="leading-tight">{address}</span>
              <span className="font-black">PHONE:</span> <span>{phone}</span>
            </div>
          </div>
        </div>

        {/* Logo Brand Branding */}
        <div className="absolute bottom-6 left-28 pointer-events-none">
          <h1 className="m-0 text-slate-500/50 text-4xl font-black tracking-tighter italic">LOGO</h1>
          <p className="m-0 text-[8px] tracking-[0.5em] font-bold text-slate-400">A·W·E·S·O·M·E</p>
        </div>
      </div>
      <p className="text-center mt-4 text-slate-400 text-sm font-medium italic">Live ID Card Preview</p>
    </section>
  );
};

export default IdCard;