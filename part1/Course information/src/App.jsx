const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  const { part, exercises } = props;
  return (
    <>
      <p>{part} {exercises}</p>
    </>
  )
}

const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {
        parts.map((unit, idx) => (
          <Part 
            part={unit.name} 
            exercises={unit.exercises} 
            key={idx}  
          />
        ))
      }
    </>
  )
}

const Total = (props) => {
  const { parts } = props;
  const totalExercise = parts.reduce((total, part) => total + part.exercises, 0);
  

  return (
    <>
      <p>Number of exercises {totalExercise}</p>
    </>
  )
}




const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 55
      }
    ]
  };

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
