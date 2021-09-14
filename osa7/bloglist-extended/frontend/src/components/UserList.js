import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>
            <Table striped size='sm'>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length} blogs</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList