import React from 'react';
import IdCard from './component/IdCard';
import InputForm from './component/InputForm';
import { useAppContext } from './component/AppContext';

const App = () => {
 
  const{
     formData,
      savedCards,
      editIndex,
      handleChange,
      handlePhoto,
      handleAdd,
      handleUpdate,
      handleDelete,
      handleEdit,
      resetForm,
  }=useAppContext();
  
  // --- RENDER ---
  return (
    <div className="flex flex-col p-10 bg-slate-50 min-h-screen font-sans">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
        <div className="w-full max-w-md">
          <InputForm 
            formData={formData}
            onChange={handleChange}
            onPhotoChange={handlePhoto}
          />
          
          {/* Add/Update Buttons */}
          <div className="flex gap-4 mt-4">
            {editIndex !== null ? (
              <button 
                onClick={handleUpdate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Update Card
              </button>
            ) : (
              <button 
                onClick={handleAdd}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Add New Card
              </button>
            )}
            {editIndex !== null && (
              <button 
                onClick={resetForm}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Current Preview */}
        <IdCard data={formData} />
      </div>

      {/* Saved Cards Section */}
      {savedCards.length > 0 && (
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Saved ID Cards</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedCards.map((card, index) => (
              <div key={card.id} className="relative">
                <IdCard data={card} />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-6 flex gap-2">
                  <button 
                    onClick={() => handleEdit(index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(card.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;