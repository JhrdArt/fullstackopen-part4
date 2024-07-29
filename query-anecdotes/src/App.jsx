import React, { useContext } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import Notification from './components/Notification';
import { NotificationContext, NotificationContextProvider, useNotification } from './context/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const { data: anecdotes, isError } = useQuery('anecdotes', getAnecdotes, { retry: false, refetchOnWindowFocus: false });

  if (isError) {
    return <div>Anecdote service is not available due to problems in the server</div>;
  }

  return (
    <NotificationContextProvider>
      <AppContent anecdotes={anecdotes} updateAnecdoteMutation={updateAnecdoteMutation} />
    </NotificationContextProvider>
  );
};

const AppContent = ({ anecdotes, updateAnecdoteMutation }) => {
  const { notification } = useContext(NotificationContext);
  const { showNotification } = useNotification()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    showNotification(`Anecdote: "${anecdote.content}" voted, ${anecdote.votes}`, 5)
  };

  return (
    <>
      <h3>Anecdote app</h3>
      <Notification notification={notification} />
      <AnecdoteForm />
      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default App;