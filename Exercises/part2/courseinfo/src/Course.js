const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Part = ({part}) => {
    return (
      <>
      <p>{part.name} {part.exercises}</p>
      
    </>
    )
  }
  
  
  const Total = ({ parts }) => {
    return (
      <p><strong>Total of {parts.reduce((acc, cur) => acc += cur.exercises, 0)} exercises</strong></p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <>
        {
          parts.map(part => <Part key={part.id} part={part} />)
        }
        <Total parts={parts}/>
      </>
    )
  }
  
  
 export default function Course({ course }){
  
    return (
      <>
        <Header course={course} />
        <Content parts={course.parts} />
      </>
    )
  }
  

