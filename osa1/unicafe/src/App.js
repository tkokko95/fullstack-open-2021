import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const avg = (good + bad * -1) / total
  const positive = good / total * 100

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad =() => {
    setBad(bad +1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button clickHandle={handleGood} label='Good' />
      <Button clickHandle={handleNeutral} label='Neutral' />
      <Button clickHandle={handleBad} label='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positive}/>
    </div>
  )
}

const Button = props => {
  return (
      <button onClick={props.clickHandle}>{props.label}</button>
  )
}

const StatisticsLine = props => {
  return (
    <p>{props.label}: {props.value} {props.suffix}</p>
  )
}

const Statistics = props => {

  if (props.total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <h3>No feedback given</h3>
      </div>
    )
  }

  else {
    return (
      <div>
        <h2>Statistics</h2>
        <StatisticsLine label='Good' value={props.good} />
        <StatisticsLine label='Neutral' value={props.neutral} />
        <StatisticsLine label='Bad' value={props.bad} />
        <StatisticsLine label='All' value={props.total} />
        <StatisticsLine label='Average' value={props.avg} />
        <StatisticsLine label='Positive' value={props.positive} suffix='%' />
      </div>
    )
  }
}
export default App