import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import ManageSchedule from '../containers/System/Staff/ManageSchedule'
import Header from '../containers/Header/Header'

class Staff extends Component {
  render() {
    const {isLoggedIn} = this.props
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/staff/manage-schedule" component={ManageSchedule} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
