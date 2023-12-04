import React, {Component} from 'react'
import {connect} from 'react-redux'
import './HotServicesPackage.scss'
import Slider from 'react-slick'

class HotServicesPackage extends Component {
  render() {
    return (
      <div className="section-share section-hot-services-package">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Gói dịch vụ hot</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hot-services-package"></div>
                  </div>
                  <div className="position text-center">
                    <div>COMBO #1</div>
                    <div>Chỉ từ 200.000 VNĐ</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hot-services-package"></div>
                  </div>
                  <div className="position text-center">
                    <div>COMBO #1</div>
                    <div>Chỉ từ 200.000 VNĐ</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hot-services-package"></div>
                  </div>
                  <div className="position text-center">
                    <div>COMBO #1</div>
                    <div>Chỉ từ 200.000 VNĐ</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hot-services-package"></div>
                  </div>
                  <div className="position text-center">
                    <div>COMBO #1</div>
                    <div>Chỉ từ 200.000 VNĐ</div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HotServicesPackage)
