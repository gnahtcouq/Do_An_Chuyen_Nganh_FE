import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ManageSchedule.scss'
import {FormattedMessage} from 'react-intl'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import {CRUD_ACTIONS, LANGUAGES, dateFormat} from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment' // package để format ngày tháng năm
import {toast} from 'react-toastify'
import _ from 'lodash'
import {saveBulkScheduleStaff} from '../../../services/userService'

class ManageSchedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listStaff: [],
      selectedStaff: {},
      currentDate: '',
      rangeTime: []
    }
  }

  componentDidMount() {
    this.props.fetchAllStaff()
    this.props.fetchAllScheduleTime()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allStaff !== this.props.allStaff) {
      let dataSelect = this.buildDataInputSelect(this.props.allStaff)
      this.setState({listStaff: dataSelect})
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      // console.log('check allScheduleTime', this.props.allScheduleTime)
      let data = this.props.allScheduleTime
      if (data && data.length > 0) {
        data = data.map((item) => ({...item, isSelected: false}))
      }
      // console.log('check data', data)
      this.setState({
        rangeTime: data
      })
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allStaff)
      let selectedStaffId = this.state.selectedStaff.value

      for (let i = 0; i < dataSelect.length; i++) {
        if (dataSelect[i].value === selectedStaffId) {
          let label = dataSelect[i].label
          let value = dataSelect[i].value
          this.setState({
            selectedStaff: {label, value}
          })
          break
        }
      }

      this.setState({
        listStaff: dataSelect
      })
    }
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({selectedStaff: selectedOption})
  }

  buildDataInputSelect = (inputData) => {
    let result = []
    let {language} = this.props
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {}
        let labelVi = `${item.lastName} ${item.firstName}`
        let labelEn = `${item.firstName} ${item.lastName}`
        object.label = language === LANGUAGES.VI ? labelVi : labelEn
        object.value = item.id
        result.push(object)
      })
    }
    return result
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({currentDate: date[0]})
  }

  handleClickBtnTime = (time) => {
    let {rangeTime} = this.state
    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected
        }
        return item
      })
      this.setState({rangeTime: rangeTime})
    }
  }

  handleSaveSchedule = async () => {
    let {rangeTime, selectedStaff, currentDate} = this.state
    let result = []

    if (selectedStaff && _.isEmpty(selectedStaff)) {
      toast.error('Please choose staff')
      return
    }
    if (!currentDate) {
      toast.error('Please choose date')
      return
    }

    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
    //  = moment(currentDate).unix()
    let formattedDate = new Date(currentDate).getTime()

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true)
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          // console.log('check schedule', schedule, index, selectedStaff)
          let object = {}
          object.staffId = selectedStaff.value
          object.date = formattedDate
          object.timeType = schedule.keyMap
          result.push(object)
        })
      } else {
        toast.error('Please choose time')
        return
      }
    }

    let res = await saveBulkScheduleStaff({
      arrSchedule: result,
      staffId: selectedStaff.value,
      formattedDate: formattedDate
    })

    if (res && res.errCode === 0) {
      toast.success('Save schedule successfully')
    } else {
      toast.error('Save schedule failed')
      console.log('check res saveBulkScheduleStaff', res)
    }

    // console.log('check res saveBulkScheduleStaff', res)
    // console.log('check result', result)
  }

  render() {
    // console.log('check state', this.state)
    let {rangeTime} = this.state
    let {language} = this.props
    // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    // console.log('check rangetime', rangeTime)
    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="manage-schedule-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-staff" />
                </label>
                <Select
                  value={this.state.selectedStaff}
                  onChange={this.handleChangeSelect}
                  options={this.state.listStaff}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate[0]}
                  minDate={new Date().setHours(0, 0, 0, 0)}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? 'btn btn-warning'
                            : 'btn btn-outline-secondary'
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    )
                  })}
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary btn-save-schedule"
                  onClick={() => this.handleSaveSchedule()}
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allStaff: state.admin.allStaff,
    allScheduleTime: state.admin.allScheduleTime
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStaff: () => dispatch(actions.fetchAllStaff()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)
