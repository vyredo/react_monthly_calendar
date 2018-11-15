import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Time from './Time'

class TimeList extends PureComponent{
    static propTypes = {
        onTimeClick: PropTypes.func,
        listOfTimes: PropTypes.array,
        onTimeClick: PropTypes.func,
        onBackClick: PropTypes.func,
        selectedTimes: PropTypes.array,
        selectedDateFormatted: PropTypes.string
    }
    
    render(){
        const { listOfTimes, onTimeClick, selectedTimes,selectedDateFormatted } = this.props
        return(
            <div>
                <div style={{paddingRight: 30, width: 300, height: 350, display: 'flex', overflowY: 'scroll', flexDirection:'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'space-between'}}>
                {
                    listOfTimes.concat(listOfTimes).concat(listOfTimes).map((time, index) => {
                        const isSelected = selectedTimes.filter(timename => timename === selectedDateFormatted + ' ' + time.time).length > 0
                        return <Time 
                            key={`${time.time}__${index}`}
                            isSelected={isSelected}
                            onClick={onTimeClick}
                            time={time.time}
                            surgePrice={time.surgePrice}
                        />
                    })
                }
                </div>
            </div>
        )
    }
}



export default TimeList