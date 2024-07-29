import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

export const AnecdotesList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    console.log("anecdotes list: ", anecdotes)

    const vote = (anecdote) => {
        dispatch((votedAnecdote(anecdote)))
        dispatch(createNotification(`"${anecdote.content}" plus 1 vote more`, 6))
    }

    const filteredAnecdote = filter.trim() ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) : anecdotes

    const sortedAnecdotes = [...filteredAnecdote].sort((a, b) => b.votes - a.votes)

    return (
        <div key='div'>
            {sortedAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
