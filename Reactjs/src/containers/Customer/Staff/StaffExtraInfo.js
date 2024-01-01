import React, {Component} from 'react'
import {connect} from 'react-redux'
import './StaffExtraInfo.scss'
import {LANGUAGES} from '../../../utils'
import {getScheduleStaffByDate} from '../../../services/userService'
import {FormattedMessage} from 'react-intl'

class StaffExtraInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowDetailInfo: false
    }
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status
    })
  }

  render() {
    let {isShowDetailInfo} = this.state

    return (
      <div className="staff-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <i class="fa-solid fa-location-dot"></i> Địa chỉ Pet Cưng
          </div>
          <div className="detail-address">
            180 Cao Lỗ - Phường 4 - Quận 8 - HCM
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false && (
            <div className="show-detail">
              Giá dịch vụ 250.000đ.
              <span onClick={() => this.showHideDetailInfo(true)}>
                {' '}
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowDetailInfo === true && (
            <>
              <div className="title-price">Giá dịch vụ</div>
              <div className="detail-price">
                <div className="price">
                  <span className="left">Giá dịch vụ</span>
                  <span className="right">250.000đ</span>
                </div>
                <div className="note">
                  Được ưu tiên khi đặt lịch qua website Pet Cưng
                </div>
              </div>
              <div className="payment">
                Khách hàng có thể thanh toán chi phí bằng hình thức tiền mặt
                hoặc quẹt thẻ
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffExtraInfo)
