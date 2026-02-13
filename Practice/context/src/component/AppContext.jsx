import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
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

  const [savedCards, setSavedCards] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

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

  // ADD new card
  const handleAdd = () => {
    if (formData.firstName && formData.lastName) {
      setSavedCards([...savedCards, { ...formData, id: Date.now() }]);
      resetForm();
    }
  };

  // UPDATE existing card
  const handleUpdate = () => {
    if (editIndex !== null) {
      const updatedCards = [...savedCards];
      updatedCards[editIndex] = { ...formData, id: savedCards[editIndex].id };
      setSavedCards(updatedCards);
      setEditIndex(null);
      resetForm();
    }
  };

  // DELETE card
  const handleDelete = (id) => {
    setSavedCards(savedCards.filter(card => card.id !== id));
    if (editIndex !== null) {
      setEditIndex(null);
      resetForm();
    }
  };

  // EDIT card - load data into form
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(savedCards[index]);
  };

  // Reset form to default values
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      designation: '',
      issue: '02/02/2017',
      expires: '02/02/2018',
      address: '',
      phone: '',
      barcode: '',
      photo: null
    });
  };

  const value = {
    // State
    formData,
    savedCards,
    editIndex,
    
    // Setters
    setFormData,
    setSavedCards,
    setEditIndex,
    
    // Handlers
    handleChange,
    handlePhoto,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleEdit,
    resetForm
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};