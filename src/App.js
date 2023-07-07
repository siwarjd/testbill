import React from 'react';
import Modal from 'react-modal';
import FormComponent from './FormComponent';

Modal.setAppElement('#root'); // Ajoutez cette ligne avant d'utiliser le composant Modal

const App = () => {
  return (
    <div>
      <FormComponent />
    </div>
  );
};

export default App;
