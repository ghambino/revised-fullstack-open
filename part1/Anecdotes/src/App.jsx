import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  
  const [ points, setPoints ] = useState(Array(anecdotes.length).fill(0));
   
  const [selected, setSelected] = useState(0);

  const getHighestVotes = () => {
    const highestNum = Math.max(...points);
    return points.indexOf(highestNum)
  }

  const generateNextAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const handleVoting = () => {
    let newVoteArr = [...points];
    newVoteArr[selected] += 1;
    setPoints(newVoteArr);
  }

  return (
    <div>
      <div>
        <p> { anecdotes[selected] } </p>
        <p>has {points[selected]} vote</p>
      </div>

      <div style={{marginTop: "1rem", display: "flex", alignItems: "center", gap: "8px"}}>
        <button onClick={() => handleVoting(selected)}>vote</button>
        <button onClick={generateNextAnecdote}>next anecdote</button>
      </div>

      <div style={{marginTop: "1rem"}}>
        <h2>Anecdotes with most votes</h2>
        <p>{anecdotes[getHighestVotes()]}</p>
        <p>has {points[getHighestVotes()]} votes</p>
      </div>
    </div>
  )
}

export default App
