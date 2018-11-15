import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calendarDayStyle, calendarDayStyle_Hover, calendarDayDateStyle, calendarDayBodyStyle } from './CalendarStyle'
import {grey} from '../indexStyle'

class CalendarDay extends React.Component {
    state = {
        isHover: false
    }
    static propTypes = {
        dayname: PropTypes.string,
        datenumber: PropTypes.number, // 1-31
        surgePrice: PropTypes.number,
        isSelected: PropTypes.bool,
        isLastColumn: PropTypes.bool,
        isLastRow: PropTypes.bool
    }
    render(){
        const {dayname, datenumber, isSelected, surgePrice, isLastColumn, isLastRow } = this.props
        const { isHover } = this.state
        let style = isLastColumn ? {...calendarDayStyle, borderRight: `1px solid ${grey}`} : calendarDayStyle
            style = isLastRow ? {...style, borderBottom: `1px solid ${grey}`} : style
            style = isHover ? calendarDayStyle_Hover : style
            style = isSelected ? calendarDayStyle_Hover : style
        return (
            <div 
                onClick={this.onClick.bind(this, datenumber)}
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                style={style}>
                <div style={calendarDayDateStyle}>{datenumber}</div>
                <div style={calendarDayBodyStyle}>{surgePrice}</div>
            </div>
        )
    }

    onClick = (datenumber, e) => {
        e.preventDefault()
        this.props.onClick && this.props.onClick(datenumber)
    }
}

export default CalendarDay