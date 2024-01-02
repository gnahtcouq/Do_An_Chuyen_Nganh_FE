import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import './ProfileStaff.scss'
import {getProfileStaffById} from '../../../services/userService'
import {LANGUAGES} from '../../../utils'
import NumberFormat from 'react-number-format'

class ProfileStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataProfile: {}
    }
  }

  async componentDidMount() {
    let data = await this.getInfoStaff(this.props.staffId)
    this.setState({
      dataProfile: data
    })
  }

  getInfoStaff = async (id) => {
    let result = {}
    if (id) {
      let res = await getProfileStaffById(id)
      if (res && res.errCode === 0) {
        result = res.data
      }
    }
    return result
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.staffId !== prevProps.staffId) {
    }
  }

  render() {
    let {dataProfile} = this.state
    let {language} = this.props
    // console.log('check state: ', this.state)
    let nameVi = '',
      nameEn = ''
    if (dataProfile) {
      nameVi = `${dataProfile.lastName} ${dataProfile.firstName}`
      nameEn = `${dataProfile.firstName} ${dataProfile.lastName}`
    }

    return (
      <div className="profile-staff-container">
        <div className="intro-staff">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ''
              })`
            }}
          ></div>

          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )}
            </div>
          </div>
        </div>

        <div className="price">
          <FormattedMessage id="customer.extra-info-staff.price" />
          {dataProfile &&
            dataProfile.Staff_Info &&
            language === LANGUAGES.VI && (
              <NumberFormat
                className="currency"
                value={dataProfile.Staff_Info.priceTypeData.valueVi}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'VNĐ'}
              />
            )}
          {dataProfile &&
            dataProfile.Staff_Info &&
            language === LANGUAGES.EN && (
              <NumberFormat
                className="currency"
                value={dataProfile.Staff_Info.priceTypeData.valueEn}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'$'}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStaff)
