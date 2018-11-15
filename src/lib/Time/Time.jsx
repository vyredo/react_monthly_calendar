import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { timeCellStyle, timeCellHover, timeCellBodyStyle } from './Timestyle'

class Time extends React.Component {
    static propTypes = {
        time: PropTypes.string, // format is HH:MM and 12 hour, start from 12:00AM - 11:59AM
        surgePrice: PropTypes.number,
        onClick: PropTypes.func,
        isSelected: PropTypes.bool
    }

    state = {
        isHover: false
    }

    render(){
        const { isHover } = this.state
        const { isSelected, time, surgePrice } = this.props
        let style = isHover ? timeCellHover : timeCellStyle
            style = isSelected ? timeCellHover : style 
        return (
            <div 
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                onClick={this.onClick.bind(this, time)}
                style={style} >
                <div>{time}</div>
                <div style={timeCellBodyStyle}>{surgePrice}</div>
            </div>
        )
    }

    onClick = (time, e) => {
        e.preventDefault()
        this.props.onClick && this.props.onClick(time)
    }
}

export default Time