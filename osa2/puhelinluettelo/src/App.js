import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{
        name: 'Arto Hellas',
        number: '0000-0000'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        if (persons.every(person => person.name !== newName)) {
            event.preventDefault()
            const newPersonObj = {name: newName, number: newNumber}
            setPersons(persons.concat(newPersonObj))
            setNewName('')
            setNewNumber('')
        }
        else {
            alert(`${newName} is already added to the phonebook`)
        }
    }

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = newFilter !== ''
        ? persons.filter(person => person.name.toLowerCase().includes(newFilter))
        : persons


    return (
        <div>
            <h1>Phonebook</h1>
            <h2>Filter</h2>
            <Filter filter={newFilter} handleFilter={handleFilter}/>
            <h2>Add A Person</h2>
            <AddNumber handleSubmit={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
            <h2>Contacts</h2>
            <Numbers persons={personsToShow} />
        </div>
    )

}

const Numbers = (props) => {
    return (
        <div>
            {props.persons.map(person => <p key={person.name}>{person.name}    {person.number}</p>)}
        </div>
    )
}

const Filter = (props) => {
    return (
        <div>
            Filter by name: <input value={props.filter} onChange={props.handleFilter} />
        </div>
    )

}

const AddNumber = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                    <div>
                        name: <input value={props.name} onChange={props.handleNameChange} />
                        number: <input value={props.number} onChange={props.handleNumberChange} />
                    </div>
                    <div>
                        <button
                            type="submit">add
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default App