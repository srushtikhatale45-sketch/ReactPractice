import React, { useState } from 'react';
import Barcode from 'react-barcode';

const Id = () => {
  // --- 1. LOGIC & STATE ---
  const [formData, setFormData] = useState({
    firstName: 'First Name',
    lastName: 'Last Name',
    designation: 'DESIGNATION',
    issue: '02/02/2017',
    expires: '02/02/2018',
    address: 'Street, City',
    phone: '+2222 222 1111',
    barcode: 'ID-987654321',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  };

  // --- 2. TEMPLATE ---
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 p-10 bg-slate-50 min-h-screen font-sans">
      
      {/* FORM SECTION */}
      <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md">
        <h3 className="text-2xl font-extrabold text-slate-800 mb-6 border-b pb-2">Edit ID Details</h3>
        <div className="grid grid-cols-1 gap-4">
          <InputField label="First Name" name="firstName" onChange={handleChange} />
          <InputField label="Last Name" name="lastName" onChange={handleChange} />
          <InputField label="Designation" name="designation" onChange={handleChange} />
          <InputField label="Phone" name="phone" onChange={handleChange} />
          <InputField label="Barcode Value" name="barcode" onChange={handleChange} />
          
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-xs font-bold uppercase text-slate-500">Upload Photo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhoto} 
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* ID CARD PREVIEW SECTION */}
      <section className="sticky top-10">
        <div className="w-[550px] h-[320px] bg-blue-200 rounded-2xl shadow-2xl flex overflow-hidden relative border-4 border-white">
          
          {/* Left Barcode Strip */}
          <div className="w-20 flex items-center justify-center bg-blue-300/30">
            <div className="-rotate-90 whitespace-nowrap">
              <Barcode 
                value={formData.barcode || "EMPTY"} 
                displayValue={false} 
                height={40} 
                width={1.5} 
                background="transparent" 
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 flex gap-6">
            {/* Photo Box */}
            <div className="w-40 h-[200px] bg-slate-800 text-white flex flex-col items-center justify-center text-center rounded-lg overflow-hidden border-2 border-slate-700">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-[10px] uppercase tracking-widest opacity-60">
                  <p>Photo Size</p>
                  <p>1.2 x 1.4 in</p>
                </div>
              )}
            </div>

            {/* Details Table */}
            <div className="flex-1 text-blue-900">
              <h2 className="text-2xl font-black uppercase leading-tight italic">{formData.firstName}, {formData.lastName}</h2>
              <p className="text-sm font-bold tracking-[0.2em] mb-4 text-blue-700">{formData.designation}</p>
              
              <div className="grid grid-cols-[80px_1fr] gap-y-2 text-sm">
                <span className="font-black">ISSUE:</span> <span>{formData.issue}</span>
                <span className="font-black">EXPIRES:</span> <span>{formData.expires}</span>
                <span className="font-black">ADDRESS:</span> <span className="leading-tight">{formData.address}</span>
                <span className="font-black">PHONE:</span> <span>{formData.phone}</span>
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

    </div>
  );
};

// --- 3. HELPER COMPONENTS ---
const InputField = ({ label, name, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold uppercase text-slate-500 tracking-wide">{label}</label>
    <input 
      className="border border-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-700" 
      name={name} 
      placeholder={label} 
      onChange={onChange} 
    />
  </div>
);

export default Id;