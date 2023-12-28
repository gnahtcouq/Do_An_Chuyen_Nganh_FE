import React, {Component} from 'react'
import {connect} from 'react-redux'
import './HomeHeader.scss'
import {FormattedMessage} from 'react-intl'
import {LANGUAGES} from '../../utils/constant'
import {withRouter} from 'react-router'
import {changeLanguageApp} from '../../store/actions'
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
    // fire redux event: actions
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    let language = this.props.language
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fa-solid fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.services" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.home-services" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.book-appointment" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.pet-hotel" />
                  </b>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fa-solid fa-circle-question"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? 'language-vi active'
                    : 'language-vi'
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? 'language-en active'
                    : 'language-en'
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="title">
              <FormattedMessage id="banner.title" />
            </div>
            {/* <div className="subtitle">
            <FormattedMessage id="banner.subtitle" />
          </div> */}
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Tìm dịch vụ"></input>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
)
