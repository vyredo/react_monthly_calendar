const cellWidth = 90
const cellHeight = 60

import { darkblue, grey, lightblue, black } from '../indexStyle'
const borderStyle = `1px solid ${grey}`

export const calendarDayStyle = {
    width: cellWidth,
    height: cellHeight,
    backgroundColor: 'white',
    border: borderStyle,
    borderRight: 'none',
    borderBottom: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
}

export const middleLine = {
    height: 420,
    borderLeft: `1px solid ${grey}`,
    margin: '0 20px',
    marginTop: -30
}

export const calendarDayStyle_Hover = Object.assign({}, calendarDayStyle, {
    backgroundColor: darkblue,
    color: 'white'
})
export const calendarDayDateStyle = {
    fontSize: 14
}
export const calendarDayBodyStyle = {
    color: lightblue,
    fontSize: 12
}

export const calendarDayHeader = {
    width: cellWidth,
    height: 30,
    textAlign: 'center',
    padding: '5px 0'
}

export const calendarContainer = {display: 'flex', flexDirection: 'column',
    // borderRight: borderStyle,
    // borderBottom: borderStyle
}