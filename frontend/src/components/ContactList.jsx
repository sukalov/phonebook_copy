import Button from "./Button"
import deleteContact from "../services/deleteContact"

const ContactList = ({ persons, search, set, setMessage }) => {
    return (
         persons.length > 0 ?
            <> 
            <h3>Contacts</h3>
            <table style={{marginBottom: 30}}>
            <tbody>
                {persons
                .filter(person => 
                person.name.toLowerCase()
                .match(search.toLowerCase()) !== null
                )
                .sort((p1, p2) => p1.name.localeCompare(p2.name))
                .map(person =>
                <tr key={person.id}>
                    <td> {person.name}</td>
                    <td> {person.number}</td>
                    <td><Button text="delete" onClick={() => deleteContact(persons, set, setMessage, person)}/></td>
                </tr>
            )}
            </tbody>
            </table>  
        </> :
        <h3>You have no contacts yet</h3>
        )
}

export default ContactList