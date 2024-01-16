import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import './BookingModal.scss'
import {Modal} from 'reactstrap'
import ProfileStaff from '../ProfileStaff'
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import {LANGUAGES} from '../../../../utils'
import Select from 'react-select'
import {postCustomerBookAppointment} from '../../../../services/userService'
import {toast} from 'react-toastify'
import moment from 'moment'

class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      birthday: '',
      selectedGender: '',
      staffId: '',
      genders: '',
      timeType: ''
    }
  }

  async componentDidMount() {
    this.props.getGenders()
  }

  buildDataGender = (data) => {
    let result = []
    let language = this.props.language
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {}
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
        object.value = item.keyMap
        result.push(object)
      })
    }
    return result
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let staffId = this.props.dataTime.staffId
        let timeType = this.props.dataTime.timeType
        this.setState({
          staffId: staffId,
          timeType: timeType
        })
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value
    let stateCopy = {...this.state}
    stateCopy[id] = valueInput
    this.setState({
      ...stateCopy
    })
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0]
    })
  }

  handleOnChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption
    })
  }

  handleConfirmBooking = async () => {
    if (
      !this.state.fullName ||
      !this.state.phoneNumber ||
      !this.state.email ||
      !this.state.address ||
      !this.state.birthday ||
      !this.state.selectedGender
    ) {
      toast.error('Vui lòng điền vào tất cả các trường bắt buộc')
      return
    }
    let date = new Date(this.state.birthday).getTime()
    let timeString = this.buildTimeBooking(this.props.dataTime)
    let staffName = this.buildStaffName(this.props.dataTime)

    let res = await postCustomerBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      staffId: this.state.staffId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      staffName: staffName
    })

    if (res && res.errCode === 0) {
      toast.success('Đặt lịch thành công')
      this.props.closeBookingClose()

      this.setState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        birthday: '',
        selectedGender: ''
      })
    } else {
      toast.error('Đặt lịch thất bại')
    }
  }

  buildTimeBooking = (dataTime) => {
    let {language} = this.props
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('dddd - MM/DD/YYYY')

      return `${time} - ${date}`
    }
    return ''
  }

  buildStaffName = (dataTime) => {
    let {language} = this.props
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.staffData.lastName} ${dataTime.staffData.firstName}`
          : `${dataTime.staffData.firstName} ${dataTime.staffData.lastName}`

      return name
    }
    return ''
  }

  render() {
    console.log('check state: ', this.state)
    let {isOpenModal, closeBookingClose, dataTime} = this.props
    let staffId = ''
    if (dataTime && !_.isEmpty(dataTime)) {
      staffId = dataTime.staffId
    }

    return (
      <Modal
        isOpen={isOpenModal}
        className={'booking-modal-container'}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="customer.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingClose}>
              <i class="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="staff-info">
              <ProfileStaff
                staffId={staffId}
                isShowDescriptionStaff={false}
                dataTime={dataTime}
              />
            </div>

            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.fullName" />
                </label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'fullName')
                  }
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'phoneNumber')
                  }
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, 'email')}
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'address')
                  }
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.birthday" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.gender" />
                </label>
                <Select
                  value={this.selectedGender}
                  onChange={this.handleOnChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn btn-primary"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="customer.booking-modal.btnConfirm" />
            </button>
            <button className="btn btn-secondary" onClick={closeBookingClose}>
              <FormattedMessage id="customer.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
