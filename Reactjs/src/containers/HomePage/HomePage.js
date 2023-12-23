import React, {Component} from 'react'
import {connect} from 'react-redux'
import HomeHeader from './HomeHeader'
import Services from './Section/Services'
import HotServicesPackage from './Section/HotServicesPackage'
import About from './Section/About'
import HomeFooter from './HomeFooter'
import './HomePage.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import OutStandingStaff from './Section/OutStandingStaff'

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
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
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    return (
      <div>
        <HomeHeader />
        <Services settings={settings} />
        <HotServicesPackage settings={settings} />
        <OutStandingStaff settings={settings} />
        <About />
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
