const Header = props => {
    return (
        <h1>{props.name}</h1>
    )
}

const Content = props => {
    return (
        <ul>
            {
                props.parts.map(part =>
                    <Part part={part.name} exercises={part.exercises} key={part.id} />
                )
            }
        </ul>
    )
}

const Part = props => {
    return (
        <li>
            {props.part} {props.exercises}
        </li>
    )
}

const Total = props => {
    return (
        <h3>
            Total of {props.total} exercises
        </h3>
    )
}

export const Course = props => {
    return (
        <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total total={props.course.total} />
        </div>
    )
}