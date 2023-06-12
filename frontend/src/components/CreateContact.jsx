import Input from './Input'
import Button from './Button'
import Validation from './Validation'
import { useState, useEffect } from 'react'
import filterAndSend from '../services/filterAndSend'

const CreateContact = ({ persons, setPersons, setMessage, createContactRef }) => {
    const [name, setNewName] = useState('')
    const [number, setNewNumber] = useState('')
    const [numberValidation, setNumberValidation] = useState(false)

    useEffect(() => {
        let parsedNumber = number.replace(/[())\s-]*/g, '').trim()
        if (parsedNumber.length === 10 && !isNaN(Number(parsedNumber))) {
          setNumberValidation(true)
        } else {setNumberValidation(false)}
      }, [number])

    const addPerson = e => {
        createContactRef.current.toggleVisibility()
        let parsedNumber = number.replace(/[())\s-]*/g, '').trim()
        parsedNumber = `${parsedNumber.slice(0,3)}-${parsedNumber.slice(3,6)}-${parsedNumber.slice(6,10)}`
        e.preventDefault();
        filterAndSend(persons, name, parsedNumber, setPersons)
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

    return (
        <div style={{marginTop: '-40px', textAlign: 'center'}}>
            <h3>Create new contact</h3>
            <form onSubmit={addPerson} style={{position: 'relative'}}>
                <Input caption='name:' handler={handleNameChange} value={name} required={true} />
                <Input caption='number:' handler={handleNumberChange} value={number} required={true} tel={true}/>
                {number === '' || <Validation status={numberValidation}></Validation>}
                <br />
                <Button type='submit' text='Add contact' />
            </form>
        </div>
    )}

export default CreateContact