import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Services.scss'
import {FormattedMessage} from 'react-intl'
import Slider from 'react-slick'

class Services extends Component {
  render() {
    return (
      <div className="section-share section-services">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Dịch vụ hàng đầu</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-services"></div>
                <div className="services-title">Cắt tỉa 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-services"></div>
                <div className="services-title">Cắt tỉa 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-services"></div>
                <div className="services-title">Cắt tỉa 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-services"></div>
                <div className="services-title">Cắt tỉa 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-services"></div>
                <div className="services-title">Cắt tỉa 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-services"></div>
                <div className="services-title">Cắt tỉa 6</div>
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)
