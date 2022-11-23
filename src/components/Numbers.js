const Numbers = ({persons, filter, handleDeleteClick}) => {
  
  const personRows = () => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    const personsToShow = filteredPersons.map(person => 
      <li key={person.name}>
        {person.name} {person.number} <button id={person.id} onClick={() => handleDeleteClick(person.id)}>Delete</button>
      </li>
    )
    return personsToShow
  }
  
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {personRows()}
      </ul>
    </>
  )
}

export default Numbers
