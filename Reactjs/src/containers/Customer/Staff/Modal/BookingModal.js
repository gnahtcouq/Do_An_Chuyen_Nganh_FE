import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import './BookingModal.scss'
import {Modal} from 'reactstrap'
import ProfileStaff from '../ProfileStaff'
import _ from 'lodash'

class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
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
            <span className="left">Thông tin đặt lịch</span>
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
                <label>Họ tên</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ email</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ</label>
                <input className="form-control"></input>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn btn-primary" onClick={closeBookingClose}>
              Xác nhận
            </button>
            <button className="btn btn-secondary" onClick={closeBookingClose}>
              Huỷ bỏ
            </button>
          </div>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
