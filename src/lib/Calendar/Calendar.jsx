import React from 'react'
import PropTypes from 'prop-types'
import {getDaysInMonth} from '../util/getDaysInMonth';
import TimeList from '../Time/TimeList'
import CalendarRow from './CalendarRow';
import { days, months } from '../util/Enum';
import { calendarContainer, middleLine } from './CalendarStyle'

class Calendar extends React.Component {
    static propTypes = {
        multiSelect: PropTypes.bool,
        withActionButton: PropTypes.bool,
        onConfirm: PropTypes.func,
        onTimeSelected: PropTypes.func,
        onDateSelected: PropTypes.func,
        style: PropTypes.object,
        listOfTimes: PropTypes.arrayOf(PropTypes.shape({
            time: PropTypes.string, // format is HH:MM and 12 hour, start from 12:00AM - 11:59AM
            surgePrice: PropTypes.number
        })).isRequired,
        listOfDates: PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.string, // format is DD/MM/YYYY
            surgePrice: PropTypes.number
        })).isRequired
    }

    constructor(props){
        super(props)
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        const numberOfDays = getDaysInMonth(month, year)
        const firstDayIndex = new Date().getDay()
        const firstDay = days[this.firstDayIndex]
        this.state = {
            selectedDates: [], // format is DD/MM/YYYY
            selectedTimes: [], // format is HH:MM and 12 hour, start from 12:00AM - 11:59AM

            showTime: false,
            showYear: year,
            showMonthIndex: month ,
            numberOfDays, firstDay, firstDayIndex,
            isMobile: false,
        }
    }

    numberOfDays = 0
    firstDay = ''
    firtDayIndex = -1

    render(){
        const { selectedTimes, showTime, selectedDates, showMonthIndex, showYear, numberOfDays, firstDay, firstDayIndex } = this.state
        const { listOfDates, listOfTimes } = this.props
        const dateDetailsForThisMonth = listOfDates.filter(d => {
            const month = Number(d.date.slice(3,5)) - 1
            const year = Number(d.date.slice(6,10))
            return month === showMonthIndex && year === showYear
        })
        return(
            <div style={this.props.style || calendarContainer}>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 200, margin: '0 auto'}}>
                        <button onClick={this.onPrevMonth}> <icon className='fa fa-angle-left'></icon> </button>
                            <div>{`${months[showMonthIndex][0].toUpperCase()+months[showMonthIndex].slice(1) } ${showYear}`}</div>
                        <button onClick={this.onNextMonth}> <icon className='fa fa-angle-right'></icon> </button>
                    </div>
                    <div style={{width: 345}}></div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <CalendarRow
                        onDayClick={this.onDayClick}
                        firstDay={firstDay}
                        firstDayIndex={firstDayIndex}
                        currentMonthIndex={showMonthIndex}
                        currentYear={showYear}
                        onDayClick={this.onDayClick}
                        numberOfDays={numberOfDays}
                        selectedDates={selectedDates}
                        dateDetailsForThisMonth={dateDetailsForThisMonth}
                    />
                    <div style={middleLine}></div>
                    <TimeList 
                        selectedDateFormatted={this.state.selectedDates.slice(-1)[0]}
                        onBackClick={this.onBackClick}
                        onTimeClick={this.onTimeClick}
                        listOfTimes={listOfTimes}
                        selectedTimes={selectedTimes}
                    />
                </div>
            </div>
        )
    }

    onNextMonth = (e) => {
        e.preventDefault()
        const nextMonthIndex = this.state.showMonthIndex === 11 ? 0 : this.state.showMonthIndex + 1
        const nextYear = this.state.showMonthIndex === 11 ? this.state.showYear + 1 : this.state.showYear
        const { firstDayIndex, firstDay, showMonthIndex, showYear, numberOfDays } = updateNumberOfMonth(nextMonthIndex, nextYear)
        this.setState({ showMonthIndex, showYear, firstDay, firstDayIndex, numberOfDays })
    }

    onPrevMonth = (e) => {
        e.preventDefault()
        const prevMonthIndex = this.state.showMonthIndex === 0 ? 11 : this.state.showMonthIndex - 1
        const prevYear = this.state.showMonthIndex === 0 ? this.state.showYear - 1 : this.state.showYear
        const { firstDayIndex, firstDay, showMonthIndex, showYear, numberOfDays } = updateNumberOfMonth(prevMonthIndex, prevYear)
        this.setState({ showMonthIndex, showYear, firstDay, firstDayIndex, numberOfDays })
    }
    onBackClick = e => {
        e.preventDefault()
        this.setState({ showTime: false , selectedDates: []})
    }

    onDayClick = (date) => {
        if(this.props.multiSelect){
            // append to the selectedDates
            // prevent duplicate
            if(this.state.selectedDates.indexOf(date) < 0) {
                date = (date < 10) ? `0${date}` : date
                const month = this.state.showMonthIndex < 9 ? '0'+(this.state.showMonthIndex+1) : this.state.showMonthIndex+1
                const formattedDate = `${date}/${month}/${this.state.showYear}`
                const selectedDates = this.state.selectedDates.concat([formattedDate])
                this.setState({ selectedDates, showTime: true }, () => {
                    this.props.onDateSelected && this.props.onDateSelected(selectedDates)
                })
            }
        } else {
            // remove the selectedDates and replace with the new date && prevent duplicate
            if(this.state.selectedDates[0] !== date) {
                date = (date < 10) ? `0${date}` : date
                const month = this.state.showMonthIndex < 9 ? '0'+(this.state.showMonthIndex+1) : this.state.showMonthIndex+1
                const formattedDate = `${date}/${month}/${this.state.showYear}`
               
                this.setState({ selectedDates: [formattedDate], showTime: true }, () => console.log(this.state))
                this.props.onDateSelected && this.props.onDateSelected([formattedDate])
            }
        }
    }

    onTimeClick = (time) => {
        let date = this.state.selectedDates.slice(-1)[0]
        if(this.props.multiSelect){
            //prevent duplicate
            if(this.state.selectedTimes.indexOf(time) < 0) {
                const formattedTime = date + ' ' + time
                const selectedTimes = this.state.selectedTimes.concat([formattedTime])
                this.setState({ selectedTimes }, () => {
                    this.props.onTimeSelected && this.props.onTimeSelected(selectedTimes)
                })
            }
        } else {
            if(this.state.selectedTimes[0] !== time) {
                const formattedTime = date + ' ' + time
                this.setState({ selectedTimes: [formattedTime] }, () => console.log(this.state))
                this.props.onTimeSelected && this.props.onTimeSelected(formattedTime)
            }
        }
    }
}

export default Calendar


function updateNumberOfMonth(month, year){
    const numberOfDays = getDaysInMonth(month, year)
    const formatDate = (month+1)+'/01/'+year // this formatted month is 1 based not 0 based
    const firstDayIndex = new Date(formatDate).getDay()
    const showYear = year
    const showMonthIndex = month
    const firstDay = days[firstDayIndex]
    return {
        firstDayIndex, firstDay, showMonthIndex, showYear, numberOfDays
    }
}