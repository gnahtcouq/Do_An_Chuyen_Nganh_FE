import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Services.scss'
import {FormattedMessage} from 'react-intl'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import serviceImg from '../../../assets/services/services-grooming.avif'

class Services extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      arrows: true,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 2
          }
        }
      ]
    }
    return (
      <div className="section-services">
        <div className="services-container">
          <div className="services-header">
            <span className="title-section">Dịch vụ phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="services-body">
            <Slider {...settings}>
              <div className="services-customize">
                <div className="bg-image"></div>
                <div>Gói cắt tỉa 1</div>
              </div>
              <div className="services-customize">
                <div className="bg-image"></div>
                <div>Gói cắt tỉa 2</div>
              </div>
              <div className="services-customize">
                <div className="bg-image"></div>
                <div>Gói cắt tỉa 3</div>
              </div>
              <div className="services-customize">
                <div className="bg-image"></div>
                <div>Gói cắt tỉa 4</div>
              </div>
              <div className="services-customize">
                <div className="bg-image"></div>
                <div>Gói cắt tỉa 5</div>
              </div>
              <div className="services-customize">
                <div className="bg-image"></div>
                <div>Gói cắt tỉa 6</div>
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
