import React, {Component} from 'react'
import {connect} from 'react-redux'
import './OutStandingStaff.scss'
import Slider from 'react-slick'
import * as actions from '../../../store/actions'
import {LANGUAGES} from '../../../utils'

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

  render() {
    let arrStaffs = this.state.arrStaffs
    // arrStaffs = arrStaffs.concat(arrStaffs).concat(arrStaffs)
    let {language} = this.props
    return (
      <div className="section-share section-out-standing-staff">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              Đội ngũ nhân viên chuyên nghiệp
            </span>
            {/* <button className="btn-section">Xem thêm</button> */}
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
                    <div className="section-customize" key={index}>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingStaff)
