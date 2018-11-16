import React from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar/Calendar'

class DesktopCalendar  extends React.PureComponent{
    static propTypes = {
        listOfDates: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string,
                surgePrice: PropTypes.number
            })
        ),
        listOfTimes: PropTypes.arrayOf(
            PropTypes.shape({
                time: PropTypes.string,
                surgePrice: PropTypes.number
            })
        ),
        onDateSelected: PropTypes.func,
        onTimeSelected: PropTypes.func
    }

    render(){
        return (
            <div style={{width: 1000, margin: '0 auto', backgroundColor: 'white', padding: 20}}>
              <div style={{display: 'flex', marginBottom: 20}}>
                <div style={{width: 638}}>Choose A Date</div>
                <div style={{marginLeft: 37}}>Choose A Time</div>
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Calendar
                  onDateSelected={this.props.onDateSelected}
                  onTimeSelected={this.props.onTimeSelected}
                  listOfDates={this.props.listOfDates || []} 
                  listOfTimes={this.props.listOfTimes || []}
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
}

const MobileCalendar = DesktopCalendar

class Container extends React.PureComponent {
    static propTypes = {
        isMobile: PropTypes.bool,
        listOfDates: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string,
                surgePrice: PropTypes.number
            })
        ),
        listOfTimes: PropTypes.arrayOf(
            PropTypes.shape({
                time: PropTypes.string,
                surgePrice: PropTypes.number
            })
        )
    }
    render(){
        const { isMobile } = this.props
        return (
            <div>
                {isMobile ? <MobileCalendar {...this.props} /> : <DesktopCalendar {...this.props} />}
            </div>
        )
    }
}


export default Container
