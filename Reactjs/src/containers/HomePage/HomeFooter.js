import React, {Component} from 'react'
import {connect} from 'react-redux'

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          Made by&nbsp;
          <a target="_blank" rel="noopener noreferrer" href="#">
            PetCung.
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
