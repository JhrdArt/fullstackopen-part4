import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotification } from "../context/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      if (newAnecdote.content.split(" ").length <= 5) {
        return showNotification(`Too short anecdote, must have length 5 or more`, 5);
      } else {
        queryClient.setQueryData("anecdotes", [...anecdotes, newAnecdote]);
        showNotification(`New anecdote: "${newAnecdote.content}" is added`, 5);
      }
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
