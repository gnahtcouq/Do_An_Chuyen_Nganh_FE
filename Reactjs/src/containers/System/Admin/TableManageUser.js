import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import './TableManageUser.scss'
import * as actions from '../../../store/actions'

class TableManageUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRedux: []
    }
  }

  componentDidMount() {
    this.props.fetchUserRedux()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({userRedux: this.props.listUsers})
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id)
  }

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user)
  }

  render() {
    // console.log('this.props.listUsers', this.props.listUsers)
    // console.log('this.state.userRedux', this.state.userRedux)
    let arrUsers = this.state.userRedux
    return (
      <table id="TableManageUser">
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="manage-user.email" />
            </th>
            <th>
              <FormattedMessage id="manage-user.last-name" />
            </th>
            <th>
              <FormattedMessage id="manage-user.first-name" />
            </th>
            <th>
              <FormattedMessage id="manage-user.phone-number" />
            </th>
            <th>
              <FormattedMessage id="manage-user.address" />
            </th>
            <th>
              <FormattedMessage id="manage-user.action" />
            </th>
          </tr>
          {arrUsers &&
            arrUsers.length > 0 &&
            arrUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.lastName}</td>
                  <td>{item.firstName}</td>
                  <td>{item.phonenumber}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditUser(item)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDeleteUser(item)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser)
