import dbService from "./dbService"

const deleteContact = (persons, set, setMessage, person) => {
    const personsUpd = [...persons]
    const index = personsUpd.indexOf(person)
    if (window.confirm(`Are you sure you want to delete ${person.name} from conacts?`)) {
        dbService.del(person)
            .then(res => {
                setMessage({message: 'Contact deleted successfully!', status:'good'});
                setTimeout(()=> setMessage({message: null}), 3000);
                personsUpd.splice(index, 0);
                set(personsUpd);
            })
            .catch(e => {
                if (e.status === 404) {
                    setMessage({message: e.body})
                    setTimeout(()=> setMessage({message: null}), 3000)
                    personsUpd.splice(index, 1);
                    set(personsUpd);
                } else {
                    console.log(e.response.data.error)
                    setMessage({message: `${e.response.status}: ${e.response.data.error}`})
                    setTimeout(()=> setMessage({message: null}), 3000)
                }
            })
    }
}

export default deleteContact