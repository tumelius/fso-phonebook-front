import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  // Let's get the persosn data from the server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons');

  const getNewName = (event) => {
    setNewName(event.target.value)
  }

  const getNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const getFilterData = (event) => {
    setFilter(event.target.value)
  }

  // Add new or update person to the phonebook
  const addPerson = (event) => {
    
    event.preventDefault()

    if (newName.length === 0) {
      alert('Please enter a name')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    // Check if the name already exists
    const nameExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (nameExists) {
      const wantToUpdate = window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number?`)	
      if (wantToUpdate) {
        personService
          .update(nameExists.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== nameExists.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .then(() => {
            setNotification({
              message: `Updated ${newName}'s number`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log('Person not found')
            setNotification({
              message: `Information of ${newName} was not found from server`, 
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

        })
        .then(() => {
          console.log('Person added')
          setNotification({
            message: `Added ${newName} to the phonebook`, 
            type: 'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log('Person not added')
          setNotification({
            message: `Could not add ${newName} to the server`, 
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
      
    // if (persons.filter(person => person.name === newName).length > 0) {
    //   alert(`${newName} is already added to phonebook`)
    //   return
    // }
    
  }
  
  const deletePerson = id => {
    
    console.log('deletePerson', id)
       
    const person = persons.find(person => person.id === id)
    console.log('person', person)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .then(() => {
          console.log('Person deleted')
          setNotification({
            message: `Deleted ${person.name} from the phonebook`, 
            type: 'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)

        })
        .catch(error => {
          console.log('Person already deleted')
          setNotification({
            message: `Information of ${person.name} has already been removed from server`, 
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notification} />
      <Filter filterHandler={getFilterData}/>
      <Form 
        formHanlder={addPerson} 
        nameChangeHandler={getNewName} 
        phoneChangeHandler={getNewNumber} />
      <Numbers persons={persons} filter={filter} handleDeleteClick={deletePerson} />
    </div>
  )

}

export default App