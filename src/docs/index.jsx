import React from "react";
import { render } from "react-dom";
import Calendar from "../../lib";
import "./styles.css";

function Demo() {
  const time = ['07:00AM', '07:30AM', '08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '11:00AM', '12:309M', '01:00PM']
  return (
    <div>
        <Calendar isMobile={false}
          onDateSelected={(dateSelected) => alert(dateSelected)}
          onTimeSelected={(timeSelected) => alert(timeSelected)}
          listOfDates={
            [{date: '01/11/2018', surgePrice: 1000}, {date: '15/11/2018', surgePrice: 100}, {date: '01/12/2018', surgePrice: 2000}, {date: '10/10/2018'}]
          } 
          listOfTimes={
            time.map(t => ({time: t, surgePrice: null}))
          }
        />
    </div>
  );
}
export default Demo
render(<Demo />, document.getElementById("app"));
