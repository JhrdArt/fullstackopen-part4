import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer";

const AnecdotesFilter = () => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault()
        const filterValue = event.target.value
        console.log(filterValue)
        dispatch(filterChange(filterValue))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default AnecdotesFilter