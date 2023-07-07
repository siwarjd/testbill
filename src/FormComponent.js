import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ScratchCard from 'scratchcard-js';
import './style.css';

Modal.setAppElement('#root');


const FormComponent = () => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const scratchCardRef = useRef(null);

  useEffect(() => {
    if (scratchCardRef.current) {
      new ScratchCard(scratchCardRef.current, {
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = {
      name: name,
      first_name: firstName,
      birthday: birthday
    };

    try {
      const response = await axios.post('http://localhost:8000/customer', customerData);
      setRandomNumber(response.data.random_number);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8000/customer/${searchId}`);
      setSearchResult(response.data);

      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
      setSearchResult(null);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Formulaire de création de compte</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="date" placeholder="Date d'anniversaire" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          <button type="submit">Me créer un compte</button>
        </form>
      </div>

      <hr />

      <div className="form search-form">
        <h1 className="title">Rechercher un client</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="ID du client"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>


      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {searchResult && searchResult.customer ? (
          <div className="result">
            <h3>Résultat de la recherche :</h3>
            <p>ID : {searchResult.customer._id}</p>
            <p>Nom : {searchResult.customer.name}</p>
            <p>Prénom : {searchResult.customer.first_name}</p>
            <p>Date d'anniversaire : {searchResult.customer.birthday}</p>
            <p>Nombre aléatoire : {searchResult.customer.random_number} </p>
          </div>
        ) : (
          <div>
            <h3>Client non trouvé</h3>
            <p>Aucun client trouvé avec cet ID.</p>
          </div>
        )}
        <button onClick={closeModal}>Fermer</button>
      </Modal>
      

      {randomNumber && (
        <div>
          <h3>Nombre aléatoire généré :</h3>
          <div className="scratch-off">{randomNumber}</div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
