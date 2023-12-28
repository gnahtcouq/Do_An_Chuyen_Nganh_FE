import React, {Component} from 'react'
import {connect} from 'react-redux'
import './OutStandingStaff.scss'
import Slider from 'react-slick'
import * as actions from '../../../store/actions'
import {LANGUAGES} from '../../../utils'
import {FormattedMessage} from 'react-intl'
import {withRouter} from 'react-router'

class OutStandingStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrStaffs: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topStaffsRedux !== this.props.topStaffsRedux) {
      this.setState({
        arrStaffs: this.props.topStaffsRedux
      })
    }
  }

  componentDidMount() {
    this.props.loadTopStaffs()
  }

  handleViewDetailStaff = (staff) => {
    // console.log('staff', staff)
    if (this.props.history) {
      this.props.history.push(`/detail-staff/${staff.id}`)
    }
  }

  render() {
    let arrStaffs = this.state.arrStaffs
    // arrStaffs = arrStaffs.concat(arrStaffs).concat(arrStaffs)
    let {language} = this.props
    return (
      <div className="section-share section-out-standing-staff">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.out-standing-staff" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrStaffs &&
                arrStaffs.length > 0 &&
                arrStaffs.map((item, index) => {
                  let imageBase64 = ''
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString(
                      'binary'
                    )
                  }
                  let nameVi = `${item.lastName} ${item.firstName}`
                  let nameEn = `${item.lastName} ${item.firstName}`
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailStaff(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-out-standing-staff"
                            style={{
                              backgroundImage: `url(${imageBase64})`
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          {/* <div>Chỉ từ 200.000 VNĐ</div> */}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topStaffsRedux: state.admin.topStaffs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopStaffs: () => dispatch(actions.fetchTopStaffs())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingStaff)
)
