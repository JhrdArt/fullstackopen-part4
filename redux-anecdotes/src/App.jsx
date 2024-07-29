import { AnecdotesForm } from './components/AnecdotesForm'
import { AnecdotesList } from './components/AnecdotesList'
import AnecdotesFilter from './components/AnecdotesFilter'
import Notification from "./components/Notification"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdotesService from "./services/anecdotes"
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getALL().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])
  
  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesFilter />
      <AnecdotesList />
      <AnecdotesForm title="Create Anecdote" />
    </>
  )
}

export default App