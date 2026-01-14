export default function Card(props) {
    return (
        <div className="card-container">
            <h1 className="card-title">{props.title}</h1>
            <p className="card-content">{props.content}</p>
        </div>
    )
}