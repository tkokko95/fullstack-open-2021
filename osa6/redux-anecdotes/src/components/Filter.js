import React from "react"
import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()
    const handleFilterChange = event => {
        dispatch(setFilter(event.target.value))
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

export default Filter