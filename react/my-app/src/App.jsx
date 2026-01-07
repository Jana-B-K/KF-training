import Button from "./Button/Button.jsx";
import Card from "./Card";
import img1 from "./assets/img-1.jpg";
import List from "./List/List.jsx"

function App() {
  const fruits = [
      {id: 1, name: "apple", calories: 95},
      {id: 2, name: "orange", calories: 45},
      {id: 3, name: "banana", calories: 105},
      {id: 4, name: "coconut", calories: 195},
      {id: 5, name: "pineapple", calories: 37},
      
  ]

    const vegetables = [
      {id: 6, name: "potatoes", calories: 110},
      {id: 7, name: "celery", calories: 15},
      {id: 8, name: "carrots", calories: 25},
      {id: 9, name: "corn", calories: 65},
      {id: 10, name: "broccoli", calories: 50},
      
  ]
  return (
    // <div className="card-container">
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    //   <Card url={img1} />
    // </div>

    <>
      <List items={fruits} category="fruits" />
      <List items={vegetables} category="vegetables" />
    </>
  );
}

export default App;
