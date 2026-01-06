import { useState, useEffect } from "react";

export default function Timer() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // setTimeout(() => {
        //     setCount(count => count+1)
        // },1000);

        let timer = setTimeout(() => {
            setCount(count => count+1)
        },1000);

        return () => {
            clearTimeout(timer);
        }
    },[])


    return (
        <h1>count is {count}</h1>
    )
}
export  function Example() {
    const [car, setCar] = useState({
        brand: "Ford",
        model: "Mustang",
        year: "1999",
        color: "Red"
    });

    function handleUpdate() {
        setCar(prevCar => ({
            ...prevCar,
            year: "2000"
        }));
    }
    // function handleUpdate() {
    //     setCar({...car, year: "2000"});
    // }

    return (
        <>
            <h1>This is useState</h1>
            <p>
              This is {car.brand} {car.model} from {car.year}
            </p>
            <button onClick={handleUpdate}>clickMe</button>
        </>
    );
}
