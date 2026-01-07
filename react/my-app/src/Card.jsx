import "./card.css";

function Card({ url }) {
  return (
    <div className="card">
      <img className="card-image" src={url} alt="img" />
      <h1 className="card-heading">This is card</h1>
      <p className="card-description">Lorem ipsum...</p>
    </div>
  );
}

export default Card;
