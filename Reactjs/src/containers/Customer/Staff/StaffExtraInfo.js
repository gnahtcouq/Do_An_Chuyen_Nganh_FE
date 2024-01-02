import React, {Component} from 'react'
import {connect} from 'react-redux'
import './StaffExtraInfo.scss'
import {LANGUAGES} from '../../../utils'
import {getExtraInfoStaffById} from '../../../services/userService'
import {FormattedMessage} from 'react-intl'
import NumberFormat from 'react-number-format'

class StaffExtraInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {}
    }
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
    if (this.props.staffIdFromParent !== prevProps.staffIdFromParent) {
      let res = await getExtraInfoStaffById(this.props.staffIdFromParent)
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data
        })
      }
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status
    })
  }

  render() {
    let {isShowDetailInfo, extraInfo} = this.state
    let {language} = this.props
    // console.log('state', this.state)

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
            <div className="short-info">
              <FormattedMessage id="customer.extra-info-staff.price" />
              {extraInfo &&
                extraInfo.priceTypeData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={extraInfo.priceTypeData.valueVi}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'VNĐ'}
                  />
                )}
              {extraInfo &&
                extraInfo.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={extraInfo.priceTypeData.valueEn}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'$'}
                  />
                )}
              <span
                className="detail"
                onClick={() => this.showHideDetailInfo(true)}
              >
                {' '}
                <FormattedMessage id="customer.extra-info-staff.detail" />
              </span>
            </div>
          )}

          {isShowDetailInfo === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="customer.extra-info-staff.price" />
              </div>
              <div className="detail-price">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="customer.extra-info-staff.price" />
                  </span>
                  <span className="right">
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className="currency"
                          value={extraInfo.priceTypeData.valueVi}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={'VNĐ'}
                        />
                      )}
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          className="currency"
                          value={extraInfo.priceTypeData.valueEn}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={'$'}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ''}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="customer.extra-info-staff.payment" />
                {extraInfo &&
                extraInfo.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfo.paymentTypeData.valueVi
                  : ''}
                {extraInfo &&
                extraInfo.paymentTypeData &&
                language === LANGUAGES.EN
                  ? extraInfo.paymentTypeData.valueEn
                  : ''}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  <FormattedMessage id="customer.extra-info-staff.hide-price" />
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
