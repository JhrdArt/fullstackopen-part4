import React, { useEffect } from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer';

export const AnecdotesForm = ({ title }) => {
    const dispatch = useDispatch();

    const onSubmitAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        console.log(content)
        e.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(createNotification(`New anecdote added: ${content}`, 5))
    }
    return (
        <>
            <h2>{title}</h2>
            <form onSubmit={onSubmitAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}
