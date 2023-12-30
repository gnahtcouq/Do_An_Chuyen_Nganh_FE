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
      allDays: []
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
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
      } else {
        object.label = moment(new Date())
          .add(i, 'days')
          .locale('en')
          .format('dddd - DD/MM')
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
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
      console.log('check res', res)
    }
  }

  render() {
    let {allDays} = this.state
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
          <div className="all-available-time"></div>
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
