import { useState, useEffect } from 'react';
function DigitalClock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        },1000)

        return () => clearTimeout(interval);
    },[])

    function formateTime(){
        let hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        const meridiem = ( hour >= 12 ? "PM" : "AM" )
        hour = hour %12 || "12";
        return `${padZero(hour)}:${padZero(minute)}:${padZero(second)} ${meridiem}`;
    }

    function padZero(number) {
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className='time-container'>
                <span>{formateTime()}</span>
            </div>
    )
}
export default DigitalClock;