import React, { useState, useEffect, Suspense } from 'react'
import dbServices from './services/dbService'
import filterAndSend from './services/newContact'
import CreateContact from './components/CreateContact'
import Filter from './components/Filter'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import login from './services/login'

const ContactList = React.lazy(() => import("./components/ContactList"));

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState({message: null})
  const [numberValidation, setNumberValidation] = useState(false)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dbServices.getAll()
         .then(response =>{
          setPersons(response)
         })
  },[])

  useEffect(() => {
    let parsedNumber = newNumber.replace(/[())\s-]*/g, '').trim()
    if (parsedNumber.length === 10 && !isNaN(Number(parsedNumber))) {
      setNumberValidation(true)
    } else {setNumberValidation(false)}
  }, [newNumber])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ message: 'Wrong credentials', status: 'bad' })
      setTimeout(() => {
        setMessage({ mesage: null })
      }, 5000)
    }
  }

  const addPerson = e => {
    let parsedNumber = newNumber.replace(/[())\s-]*/g, '').trim()
    parsedNumber = `${parsedNumber.slice(0,3)}-${parsedNumber.slice(3,6)}-${parsedNumber.slice(6,10)}`
    e.preventDefault();
    filterAndSend(persons, newName, parsedNumber, setPersons)
      .then(res => {
        setMessage({message: `Action completed succesfully!`, status: 'good'})
        setNewName('')
        setNewNumber('')
      }).then(
        setTimeout(() => setMessage({message: null}), 3000)
      )
      .catch(e => {
        setMessage({message: e.response.data.error, status: 'bad'})
      })
  };

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleSearchChange = e => setSearch(e.target.value)

  return (
    <main>
      <div className='main'>
      {user ?
      <>
        <h1>Phonebook</h1>
          <Filter handler={handleSearchChange} value={search} />
          <CreateContact addPerson={addPerson}
                        name={newName} 
                        handlerName={handleNameChange}
                        number={newNumber}
                        handlerNumber={handleNumberChange}
                        numberValidation={numberValidation}
                          />
          <Suspense fallback={<p>Contacts are loading...</p>}>
            <ContactList  persons={persons}
                          search={search}
                          set={setPersons}
                          setMessage={setMessage} />
          </Suspense> 
          </> :
          <p>please, log in to see your phonebook</p>
        }
      </div> 
      <LoginForm handleLogin={handleLogin}
                 username={username}
                 password={password}
                 setUsername={setUsername}
                 setPassword={setPassword}
                 user={user}
                 />
      <Notification message={message.message} status={message.status}/>
    </main>
  )
}

export default App