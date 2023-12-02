import React, {Component} from 'react'
import {connect} from 'react-redux'
import './HomeHeader.scss'

class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fa-solid fa-bars"></i>
            <div className="header-logo"></div>
          </div>
          <div className="center-content">
            <div className="child-content">
              <div>
                <b>Dịch vụ</b>
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>Dịch vụ tại nhà</b>
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>Khách sạn thú cưng</b>
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="support">
              <i class="fa-solid fa-circle-question"></i>Hỗ trợ
            </div>
            <div className="flag">VN</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
