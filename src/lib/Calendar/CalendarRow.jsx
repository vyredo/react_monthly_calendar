import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CalendarDay from './CalendarDay'
import { months, days } from '../util/Enum';
import { calendarDayStyle, calendarDayHeader,calendarContainer } from './CalendarStyle'
import { grey } from '../indexStyle'

class CalendarRow extends PureComponent{
    static propTypes = {
        dateDetailsForThisMonth: PropTypes.arrayOf(
            PropTypes.shape({
                [PropTypes.number]: PropTypes.shape({
                    surgePrice: PropTypes.number
                })
            })
        ),
        onDayClick: PropTypes.func,
        numberOfDays: PropTypes.number,
        selectedDates: PropTypes.array,
        firstDay: PropTypes.string,
        firstDayIndex: PropTypes.number,
        currentMonthIndex: PropTypes.number,
        currentYear: PropTypes.number
    }

   

    constructor(props){
        super(props)
        const { numberOfDays, dateDetailsForThisMonth, firstDayIndex, currentMonthIndex, currentYear } = this.props
        this.CalendarGrid = updateCalendarGrid({ numberOfDays, dateDetailsForThisMonth, firstDayIndex, days, currentMonthIndex, currentYear })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.currentMonthIndex === this.props.currentMonthIndex) return
        const { numberOfDays, dateDetailsForThisMonth, firstDayIndex, currentMonthIndex, currentYear } = nextProps
        this.CalendarGrid = updateCalendarGrid({ numberOfDays, dateDetailsForThisMonth, firstDayIndex, days, currentMonthIndex, currentYear })
    }

    render(){
        const { selectedDates, currentMonthIndex, currentYear, onDayClick } = this.props
        const { CalendarGrid } = this
        const enumDays = days

        return(
            <div style={calendarContainer}>
                <div style={{display: 'flex'}}>
                {
                    // Calendar Header
                    enumDays.map(dayname => <CalendarHeader key={dayname} text={dayname[0].toUpperCase()} /> )
                }
                </div>
                {CalendarGrid.map((row, rowIndex) => {
                    return <div key={`ROW_${rowIndex}`} style={{display: 'flex'}}>
                    {
                        row && row.map((Obj, columnIndex) => {
                        if(!("date" in Obj)) return <Obj key={`Row_${rowIndex}_Column${columnIndex}`} />
                        const isSelected = selectedDates.filter(dateFormatted => dateFormatted === Obj.dateFormatted).length > 0
                        return <CalendarDay     
                                    isLastRow={rowIndex === CalendarGrid.length - 1}
                                    isLastColumn={columnIndex === 6}
                                    key={`Row${rowIndex}_Column${columnIndex}`}
                                    isSelected={isSelected}
                                    datenumber={Obj && Obj.date}
                                    dayname={Obj && Obj.dayname}
                                    surgePrice={Obj && Obj.surgePrice}
                                    month={currentMonthIndex}
                                    year={currentYear}
                                    onClick={onDayClick}
                                />
                        })
                    }
                    </div>
                })}
            </div>
        )
    }
}


export default CalendarRow

const CalendarEmpty = (props) => <div style={calendarDayStyle}></div>
const CalendarEmptyLastRow = props => <div style={{...calendarDayStyle, borderBottom: `1px solid ${grey}`}}></div>
const CalendarEmptyLastRowNColumn = props => <div style={{...calendarDayStyle, borderBottom: `1px solid ${grey}`, borderRight: `1px solid ${grey}`}}></div>



const CalendarHeader = props => {
    return (
        <div style={calendarDayHeader}>
            {props.text}
        </div>
    )
}

function updateCalendarGrid(args){
    const { numberOfDays, dateDetailsForThisMonth, firstDayIndex, days:enumDays, currentMonthIndex, currentYear} = args
    const CalendarGrid = createDefaultCalendarGrid()
    let date = 1
    const month = currentMonthIndex < 9 ? `0${Number(currentMonthIndex)+1}` : Number(currentMonthIndex)+1
    for(let row=0; row<6; row++){
        if(date === numberOfDays) break 
        for(let column=0; column<7; column++){
            if(date === numberOfDays) break 
            if(row === 0 && column === firstDayIndex){
                const dateFormatted = (date < 10 ? `0${date}` : date)+`/${month}/${currentYear}`
                const dateInfo = dateDetailsForThisMonth.filter(dt => dt.date === dateFormatted)[0]
                const surgePrice = dateInfo ? dateInfo.surgePrice : null
                CalendarGrid[row][column] = {
                    date: 1,
                    dateFormatted,
                    dayname: enumDays[column],
                    surgePrice
                }
                date++
            } else if (date > 1 && date <= numberOfDays){
                const dateFormatted = (date < 10 ? `0${date}` : date)+`/${month}/${currentYear}`
                const dateInfo = dateDetailsForThisMonth.filter(dt => dt.date === dateFormatted)[0]
                const surgePrice = dateInfo ? dateInfo.surgePrice : null
                CalendarGrid[row][column] = {
                    date,
                    dateFormatted,
                    dayname: enumDays[column],
                    surgePrice
                }
                date++
            }
        }
    }
    const isLastRowEmpty = (CalendarGrid[5].filter(obj => ("date" in obj)).length) === 0
    if(isLastRowEmpty){
        //remove the last row
        CalendarGrid.splice(5,1)
    }
    return CalendarGrid
}

const createDefaultCalendarGrid = () => [
    [CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty],
    [CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty],
    [CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty],
    [CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty],
    [CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRowNColumn],
    [CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRow, CalendarEmptyLastRowNColumn]
    // [CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty, CalendarEmpty] // is this needed?
]