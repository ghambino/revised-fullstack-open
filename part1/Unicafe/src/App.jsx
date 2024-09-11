import { useState } from 'react'

const Button = ({ text, handleBtnClick }) => {
  return (
    <>
      <button onClick={handleBtnClick}>{text}</button>
    </>
  )
}

const StatisticsLine = ({ displayedInfo }) => {
  const { name, displayedData, type } = displayedInfo;
  return (
    <>
      {
        type ? (
          <p>{name} {displayedData}%</p>
        ) : (
          <p>{name}{" "}{displayedData}</p>
        )
      }
    </>
  )
}

const Statistics = ({feedbackBreakdown}) => {
  return (
    <>
      {
        feedbackBreakdown.map((unit, index) => (
          <StatisticsLine key={index} displayedInfo={unit}/>
        ))
      }
    </>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }
  
  const totalfeedback = good + neutral + bad;

  const averageScore = () => {
    let val = (good * 1) + (neutral * 0) + (bad * -1);
    if(!val){
      return 0;
    }
    return Number(val / totalfeedback);
  }

  const percentagePositive = () => {
    return ((good / totalfeedback) * 100).toFixed(2);
  }

  const feedbackBreakdownData = [
    {name: "Good", displayedData: good},
    {name: "Neutral", displayedData: neutral},
    {name: "Bad", displayedData: bad},
    {name: "All feedback count", displayedData: totalfeedback},
    {name: "Average", displayedData: averageScore()},
    {name: "Positive", displayedData: percentagePositive(), type: "percentile"},
  ]

  return (
    <div>
      <h1>Give feedback</h1>

      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px"}}>
        <Button text={"good"} handleBtnClick={handleGoodClick}/>
        <Button text={"neutral"} handleBtnClick={handleNeutralClick}/>
        <Button text={"bad"} handleBtnClick={handleBadClick}/>
      </div>

      <h1>Statistics</h1>

      {
        totalfeedback > 0 ? (
          <div>
            <Statistics feedbackBreakdown={feedbackBreakdownData}/>
          </div>
        ) : (
          <p>No feedback given</p>
        )
      }

      
    </div>
  )
}

export default App
