import Card from  './Card'
export default function Home(props) {
    return(
        <Card title={props.title} content={props.content}/>
    )
}