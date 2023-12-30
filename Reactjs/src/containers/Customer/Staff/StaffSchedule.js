import React, {Component} from 'react'
import {connect} from 'react-redux'
import './StaffSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import {LANGUAGES} from '../../../utils'
import {getScheduleStaffByDate} from '../../../services/userService'

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

    console.log(moment(new Date()).format('dddd - DD/MM'))
    console.log(moment(new Date()).locale('en').format('dddd - DD/MM/YYYY'))
    this.setArrDays(language)
    // console.log('allDays', allDays)
  }

  setArrDays = (language) => {
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

    this.setState({
      allDays: allDays
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setArrDays(this.props.language)
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
      console.log('check res', res)
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
                <i className="fas fa-calendar-alt"></i>Lịch hẹn
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn
                  return (
                    <button className="btn btn-warning" key={index}>
                      {timeDisplay}
                    </button>
                  )
                })
              ) : (
                <p>
                  Chưa có lịch trong khoảng thời gian này, vui lòng chọn khoảng
                  thời gian khác!
                </p>
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
