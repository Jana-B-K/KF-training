import { useState } from 'react';
import styles from "./List.module.css";

export default function List({ category, items }) {         
    const [shipping, setShipping] = useState("");

    function handleShipping(event){
        setShipping(event.target.value);
    }
  return (
    <div className={styles.listWrapper}>
      <h3 className={styles.listCategory}>{category}</h3>

      <ol className={styles.listItems}>
        {items.map(item => (
          <li key={item.id} className={styles.listItem}>
            <span>{item.name}</span>
            <span className={styles.calories}>{item.calories}</span>
          </li>
        ))}
      </ol>
      <div className={styles.useState}>
            <label>
                    <input type="radio" value="pickup" 
                        checked={shipping === "pickup"}
                        onChange={handleShipping}
                    />
                    pickup
            </label>
            <br />
            <label>
                    <input type="radio" value="delivery" 
                        checked={shipping === "delivery"}
                        onChange={handleShipping}
                    />
                    pickup
            </label>
            <p>{shipping}</p>
      </div>
      
    </div>
  );
}
