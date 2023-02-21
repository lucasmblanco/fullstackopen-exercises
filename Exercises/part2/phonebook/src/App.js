import React, { useEffect, useState } from 'react'
import Filter from './Filter';
import Add from './Add';
import Phonebook from './Phonebook';
import { getPersons, create, remove, editNumber } from './services/persons';
import NotificationMessage from './NotificationMessage';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(''); 
  const [newNumber, setNewNumber] = useState(''); 
  const [filter, setFilter] = useState(''); 
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  function onHandleSubmit(e) {
    e.preventDefault();
    const duplicated = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if (duplicated) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        editNumber(duplicated.id, { ...duplicated, number: newNumber })
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
            setNewName(""); 
            setNewNumber("");
          })
          .catch(() => {
            setMessage(`Information of ${newName} has already been removed from the server`); 
            setIsError(true); 
            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 2000)
          })
          
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }


    create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    setMessage(`Added ${newName} with success`); 
    setNewName(""); 
    setNewNumber("");
    setTimeout(() => setMessage(null), 2000)
  }

  function onNameChange(e) {
    setNewName(e.target.value)
  }

  function onNumberChange(e) {
    setNewNumber(e.target.value)
  }

  function onFilterChange(e) {
    setFilter(e.target.value)
  }

  const phoneList = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons 

  function deletePerson(e) {
    if (window.confirm(`Delete ${e.target.name}?`)) {
      remove(e.target.id); 
      setPersons(persons.filter(element => element.id !== Number(e.target.id)))
    }
  }


  useEffect(() => {
      getPersons()
      .then(response => setPersons(response))
  }, [])


  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={onFilterChange} />
      <h2>add a new</h2>
      <NotificationMessage message={message} isError={ isError } />
      <Add onHandleSubmit={onHandleSubmit} onNameChange={onNameChange} onNumberChange={onNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Phonebook phoneList={phoneList} deletePerson={deletePerson} />
    </div>
  )
}

export default App