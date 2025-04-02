import React, {useState, useEffect} from 'react';
import './App.css';

function Anecdote({anecdotes, votes }) {
  return (
    <div>
      <p>{anecdotes}</p>
      <p>Has <span style={{fontWeight: 'bold'}}>{votes}</span> votes</p>
    </div>
  )
}

function App({anecdotes}) {
  const [selected, setSelected] = useState(0);
  const [votes,  setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(-1)
  console.log(votes);
  
  const handleNextAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const handleVotes = () =>{
    let votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const handleMaxVotes = () =>{
    if(Math.max(...votes) === 0){
      setMaxVotes(-1)
    } 
    else{
      setMaxVotes(votes.indexOf(Math.max(...votes)))
    }
  }

  useEffect(() =>{
    handleMaxVotes();
  })

  return (
    <div>
      <h3>Anecdotes of the day</h3>
      <Anecdote anecdotes={anecdotes[selected]} 
      votes={votes[selected]} />

      <button onClick={handleVotes}>vote</button>
      <button onClick={handleNextAnecdote}>Next Anecdote</button>
      <div>
        <h3>Anecdotes with most votes</h3>
        {(maxVotes === -1) ? "" : 
        <> <Anecdote anecdotes={anecdotes[maxVotes]} votes={votes[maxVotes]}/>
        </>
        }
      </div>
    </div>
  );
}

export default App;
