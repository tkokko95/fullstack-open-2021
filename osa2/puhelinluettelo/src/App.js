import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleChange = (event) => {
        setNewName(event.target.value)
    }

    const addName = (event) => {
        if (persons.every(person => person.name !== newName)) {
            event.preventDefault()
            const newNameObj = {name: newName}
            setPersons(persons.concat(newNameObj))
            setNewName('')
        }
        else {
            alert(`${newName} is already added to the phonebook`)
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleChange} />
                </div>
                <div>
                    <button
                        type="submit">add
                    </button>
                </div>

            </form>
            <h2>Numbers</h2>
            <Numbers persons={persons} />
      ...
        </div>
    )

}

const Numbers= (props) => {
    return (
        <div>
            {props.persons.map(person => <p key={person.name}>{person.name}</p>)}
        </div>
    )
}

export default App