import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ authors, show }) => {

  const [name, setName] = useState('')
  const [birthyear, setBirtyear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR,
    {
      refetchQueries:[{query: ALL_AUTHORS}]
    }
  )

  const handleSubmit = event => {
    event.preventDefault()

    const birthyearNum = Number(birthyear)
    editAuthor({
      variables: {
        name: name,
        setBornTo: birthyearNum
      }
    })
    setName('')
    setBirtyear('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h4>Set birthyear</h4>
      <form onSubmit={handleSubmit}>
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map(author => {
                return(
                <option value={author.name} key={author.name}>{author.name}</option>
                )
              })}
            </select>
            Year: <input value={birthyear} type='number' onChange={({ target }) => setBirtyear(target.value)} />
            <button type='submit'>Submit</button>
      </form>

    </div>
  )
}

export default Authors