import React, {useState, useEffect} from 'react';
import noteService from './services/notes';
import './app.css';

function PhonebookList ({filteredArray, handleDelete}){
  return (
    <>
    <h2>stored information</h2>
    <div>
        <ol>
        {filteredArray.map((filterOutput, index) => {
          return (
            <>
            <li key={index}>
              {filterOutput.name} {filterOutput.number} 
              <button onClick={() => handleDelete(filterOutput.id)}>delete</button>
            </li>
            </>
          )
        })}
        </ol>
      </div>
    </>
  )
}
const DataEntryPoint = ({persons, setPersons, setErrorMessage}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handlePersonsChange = (event) => {
    event.preventDefault();
  
    let newPerson = {
      name: newName,
      number: newNumber
    };
    
    const existingPerson = persons.find(person => person.name === newName);
    const adjustedPerson = {...existingPerson, number: newNumber}
  
    if (existingPerson !== undefined){
     if (window.confirm(`${newName} is already added to the phonebook, Replace the old number with a new one?`)){
       noteService.adjust(existingPerson.id, adjustedPerson).then((returnedData) => {
         setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedData))
       })
     }else {
       alert('ok');
     }
  
    }else {
      noteService.create(newPerson).then((returnedData) => {
      console.log(returnedData);
      setPersons([...persons, returnedData]);
        setErrorMessage(`Added ${returnedData.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }).catch(error => console.log(error.message))
    }
    
    setNewName('');
    setNewNumber('');
  }

  return(
    <>
    <h2>Add a new contact</h2>
        <form onSubmit={handlePersonsChange}>
        <div>
          Name: <input value={newName} 
          onChange={(e) => setNewName(e.target.value)} required/>
        </div>
        <br />
        <div>
        Number: <input  value={newNumber} 
        onChange={(e) => setNewNumber(e.target.value)} required/>
        </div>
        <br />
        <button type='submit'>add</button>
      </form>
    </>
  )
}

const Notification = ({errorMessage}) => {

  return (
    <div className='error'>
    {errorMessage}
    </div>
  )
}


function App() {
  const [persons, setPersons] = useState([]);
  const [filterWord, setFilterWord] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);

// const filteredArray = (filterWord.length === 0) ? persons : persons.filter(person => person.name.indexOf(filterWord))
// console.log(filteredArray);

useEffect(() =>{
  noteService.getAll().then(returnedData => {
      setPersons(returnedData);
  }).catch(error => console.log(error.message));
}, []);

let filteredArray = persons.filter(person => person.name.toLowerCase().includes(filterWord.toLowerCase()) || filterWord === '')
console.log(filteredArray);

const handleDelete = (id) => {
const note = persons.find(person => person.id === id);
  if (window.confirm(`Delete ${note.name}?`)){
    noteService.erase(id).then((returnedRes =>{
      if(returnedRes !== null){
        setPersons(persons.filter(filt => filt.id !== id))
        setErrorMessage(`${note.name} has been permanently deleted from the server!!`)
        setTimeout(() => {
          setErrorMessage(null);
        },3000)
      } else {
        alert('broken code event');
      }
    }))
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <>
      {(errorMessage === null) ? '': <Notification errorMessage={errorMessage}/>}
         
      </>
      <br />
      <div>
        filter shown with: <input value={filterWord}
        onChange={(e) => setFilterWord(e.target.value)}/>
      </div>
      <div>
        <DataEntryPoint 
        persons={persons} 
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        />
      </div>
      <div>
        <PhonebookList 
        filteredArray={filteredArray} 
        handleDelete={handleDelete}        
        /> 
     </div>
     </div>
  );
}

export default App;
