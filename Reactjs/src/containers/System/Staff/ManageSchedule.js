import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ManageSchedule.scss'
import {FormattedMessage} from 'react-intl'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import {CRUD_ACTIONS, LANGUAGES} from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment' // package để format ngày tháng năm

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
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allStaff)
    //   this.setState({listStaff: dataSelect})
    // }

    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allStaff)
    //   for (let i = 0; i < dataSelect.length; i++) {
    //     if (dataSelect[i].value === this.state.selectedOption.value) {
    //       let label = dataSelect[i].label
    //       let value = dataSelect[i].value
    //       this.setState({
    //         selectedOption: {label, value}
    //       })
    //       break
    //     }
    //   }
    //   this.setState({
    //     listStaff: dataSelect
    //   })
    // }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({
        rangeTime: this.props.allScheduleTime
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

  render() {
    console.log('check state', this.state)
    let {rangeTime} = this.state
    let {language} = this.props
    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="m-s-title">
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
                  minDate={new Date()}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button className="btn btn-outline-primary" key={index}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    )
                  })}
              </div>
              <div className="col-12">
                <button className="btn btn-primary btn-save-schedule">
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
