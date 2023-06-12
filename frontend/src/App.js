import React, { useState, useEffect, useRef, Suspense } from 'react'
import dbServices from './services/dbService'
import CreateContact from './components/CreateContact'
import Filter from './components/Filter'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const ContactList = React.lazy(() => import("./components/ContactList"));

const App = () => {

  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState({message: null})
  const [user, setUser] = useState(null)
  const createContactRef = useRef()

  useEffect(() => {
    dbServices.getAll()
         .then(response =>{
          setPersons(response)
         })
  },[])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setUser({token: localStorage.getItem('token'), username:localStorage.getItem('username')})
      dbServices.setToken(token)
    }
  }, [])

  const handleSearchChange = e => setSearch(e.target.value)

  return (
    <main>
      <div className='main'>
      {user ?
      <>
        <h1>Phonebook</h1>
          <Filter handler={handleSearchChange} value={search} />
          <Togglable label="add contact" ref={createContactRef}>
            <CreateContact persons={persons} setPersons={setPersons} setMessage={setMessage} createContactRef={createContactRef}/>
          </Togglable>
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
      <LoginForm setMessage={setMessage}
                 user={user}
                 setUser={setUser}
                 />
      <Notification message={message.message} status={message.status}/>
    </main>
  )
}

export default App