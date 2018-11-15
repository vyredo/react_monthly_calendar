import React from "react";
import { render } from "react-dom";
import Calendar from "../../lib";
import "./styles.css";

function Demo() {
  const time = ['07:00AM', '07:30AM', '08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '11:00AM', '12:309M', '01:00PM']
  return (
    <div style={{width: 1000, margin: '0 auto', backgroundColor: 'white', padding: 20}}>
      <div style={{display: 'flex', marginBottom: 20}}>
        <div style={{width: 638}}>Choose A Date</div>
        <div style={{marginLeft: 37}}>Choose A Time</div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Calendar
          listOfDates={
            [{date: '01/11/2018', surgePrice: 1000}, {date: '15/11/2018', surgePrice: 100}, {date: '01/12/2018', surgePrice: 2000}, {date: '10/10/2018'}]
          } 
          listOfTimes={
            time.map(t => ({time: t, surgePrice: null}))
          }
        />
      </div>
      <div>
        <div style={{borderTop: '1px solid rgb(0,0,0,0.2)'}}/>
        <div>
          <button>confirm</button>
        </div>
      </div>
    </div>
  );
}
export default Demo
render(<Demo />, document.getElementById("app"));
