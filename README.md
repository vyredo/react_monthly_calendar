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
                <Calendar isMobile={false}
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

