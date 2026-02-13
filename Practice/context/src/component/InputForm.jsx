import React from 'react';
import { useAppContext } from './AppContext';

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold uppercase text-slate-500 tracking-wide">{label}</label>
    <input 
      className="border border-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-700" 
      name={name} 
      value={value || ''} 
      placeholder={label} 
      onChange={onChange} 
    />
  </div>
);

const InputForm = ({ formData = {}, onChange, onPhotoChange }) => {
  const {
    firstName = '',
    lastName = '',
    designation = '',
    phone = '',
    barcode = '',
    issue = '',
    expires = '',
    address = ''
  } = formData;

  return (
    <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md">
      <h3 className="text-2xl font-extrabold text-slate-800 mb-6 border-b pb-2">Edit ID Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <InputField 
          label="First Name" 
          name="firstName" 
          value={firstName}
          onChange={onChange} 
        />
        <InputField 
          label="Last Name" 
          name="lastName" 
          value={lastName}
          onChange={onChange} 
        />
        <InputField 
          label="Designation" 
          name="designation" 
          value={designation}
          onChange={onChange} 
        />
        <InputField 
          label="Phone" 
          name="phone" 
          value={phone}
          onChange={onChange} 
        />
        <InputField 
          label="Issue Date" 
          name="issue" 
          value={issue}
          onChange={onChange} 
        />
        <InputField 
          label="Expiry Date" 
          name="expires" 
          value={expires}
          onChange={onChange} 
        />
        <InputField 
          label="Address" 
          name="address" 
          value={address}
          onChange={onChange} 
        />
        <InputField 
          label="Barcode Value" 
          name="barcode" 
          value={barcode}
          onChange={onChange} 
        />
        
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-xs font-bold uppercase text-slate-500">Upload Photo</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={onPhotoChange} 
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default InputForm;