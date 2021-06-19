import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ setFilter }) => {
    const handleFilterChange = event => {
        setFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <strong style={style}>
            Filter &nbsp; <input onChange={handleFilterChange} />
        </strong>
    )
}

const mapStateToProps = state => {
    return ({
        filter: state.filter
    })
}

const mapDispatchToProps = { setFilter }

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter