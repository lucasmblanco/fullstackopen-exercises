import { useState } from 'react'

const StatisticLine = ({ text, display }) => {
  return <tr>
  <td>{text}</td><td>{display}</td></tr>
}



const Statistics = ({ good, neutral, bad }) => {

  return (
    <>
      <h2>Statistics</h2>
    {
        (good === 0 && neutral === 0 && bad === 0) ? <p>No feedback given</p> : 
          <table>
            <tbody>
            <StatisticLine text='Good' display={good} />
            <StatisticLine text='Neutral' display={neutral} />
            <StatisticLine text='Bad' display={bad} />
            <StatisticLine text='ALL' display={good + neutral + bad} />
            <StatisticLine text='AVERAGE' display={(good - bad) / (good + neutral + bad)} />
              <StatisticLine text='POSITIVE' display={(good * 100) / (good + neutral + bad) + '%'} />
              </tbody>
        </table>
      }
      
    </>
  )
}

const Button = ({ name, action }) => {
  return (
    <button onClick={() => action(prevState => prevState + 1)}>{name}</button>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button name={'GOOD'} action={setGood} />
        <Button name={'NEUTRAL'} action={setNeutral} />
        <Button name={'BAD'} action={setBad} />
      </div>
     <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
      
  
  )
}

export default App