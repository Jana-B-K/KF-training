import { useState } from 'react';
function ColorPicker() {
    const [color, setColor] = useState("#e6e6e6");
    function handleChange(event) {
        setColor(event.target.value);
    }
    return (
        <div className='color-container'>
            <h1>color picker</h1>
            <div className='color-display' style={{backgroundColor: color}}>
                <p >Selected color: {color}</p>
            </div>
            <label>select a color: </label> 
            <input type="color" value={color}
                    onChange={handleChange}
            />    
        </div>
    )
}
export default ColorPicker;