import React, {Component} from 'react'
import {connect} from 'react-redux'
import './StaffSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import {LANGUAGES} from '../../../utils'
import {getScheduleStaffByDate} from '../../../services/userService'
import {FormattedMessage} from 'react-intl'

class StaffSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
      allAvailableTime: []
    }
  }

  async componentDidMount() {
    let {language} = this.props
    let allDays = this.getArrDays(language)
    this.setState({
      allDays: allDays
    })

    // console.log('allDays', allDays)
  }

  getArrDays = (language) => {
    let allDays = []
    for (let i = 0; i < 7; i++) {
      let object = {}
      let currentDate = moment(new Date()).startOf('day')
      let currentDay = currentDate.clone().add(i, 'days')

      if (language === LANGUAGES.VI) {
        object.label = currentDay.isSame(currentDate, 'day')
          ? `Hôm nay - ${currentDay.format('DD/MM')}`
          : currentDay
              .format('dddd - DD/MM')
              .replace(/^t/g, 'T')
              .replace('chủ nhật', 'Chủ nhật')
      } else {
        object.label = currentDay.isSame(currentDate, 'day')
          ? `Today - ${currentDay.locale('en').format('DD/MM')}`
          : currentDay.locale('en').format('dddd - DD/MM')
      }

      object.value = currentDay.valueOf()
      allDays.push(object)
    }

    return allDays
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language)
      this.setState({
        allDays: allDays
      })
    }
    if (this.props.staffIdFromParent !== prevProps.staffIdFromParent) {
      let allDays = this.getArrDays(this.props.language)
      let res = await getScheduleStaffByDate(
        this.props.staffIdFromParent,
        allDays[0].value
      )
      this.setState({
        allAvailableTime: res.data ? res.data : []
      })
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.staffIdFromParent && this.props.staffIdFromParent !== -1) {
      let staffId = this.props.staffIdFromParent
      let date = event.target.value
      let res = await getScheduleStaffByDate(staffId, date)

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : []
        })
      }
      // console.log('check res', res)
    }
  }

  render() {
    let {allDays, allAvailableTime} = this.state
    let {language} = this.props
    return (
      <React.Fragment>
        <div className="staff-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt"></i>
                <FormattedMessage id="customer.detail-staff.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <React.Fragment>
                  <div className="time-content-btns">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn
                      return (
                        <button className="btn btn-warning" key={index}>
                          {timeDisplay}
                        </button>
                      )
                    })}
                  </div>

                  <div className="booking-free">
                    <span>
                      <FormattedMessage id="customer.detail-staff.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="customer.detail-staff.booking-free" />
                    </span>
                  </div>
                </React.Fragment>
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="customer.detail-staff.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffSchedule)
