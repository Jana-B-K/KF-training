export default function Counter() {
    return (
        <div className="counter-container">
            <h1 className="counter-title">Counter</h1>
            <p className="counter-value"></p>
            <div className="counter-options">
                <button  className="counter-btn">-</button>
                <button  className="counter-btn">Reset</button>
                <button  className="counter-btn">+</button>
            </div>
        </div>
    )
}