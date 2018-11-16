# React calendar
based on https://github.com/markusenglund/react-npm-component-starter

## How To Run
1. `npm install --save monthly-calendar`

## How to Use in React
Note: Make sure fontawesome is loaded in your html
```
import Calendar from 'monthly-calendar'
import React from 'react'

class App extends React.Component {
    render(){
        return (
            <div>
                <Calendar 
                    isMobile={false}
                    onDateSelected={(dateSelected) => alert(dateSelected)}
                    onTimeSelected={(timeSelected) => alert(timeSelected)}
                    listOfDates={
                        [{date: '01/11/2018', surgePrice: 1000}, {date: '15/11/2018', surgePrice: 100}, {date: '01/12/2018', surgePrice: 2000}, {date: '10/10/2018'}]
                    } 
                    listOfTimes={
                        [{time: '07:00AM', surgePrice: null}, {time: '07:30AM', surgePrice: 100}]
                    }
                />
            </div>
        );
    }
}
render(<App />, document.getElementById("app"));
```

## NOTES
1. There are 5 props
2. the format of date is DD/MM/YYYY
3. If you wish to include price, just insert like example above
4. provide your function to onDateSelected, when user click this function will be called
5. provide your own function to onTimeSelected, when user click the time, this function will be called