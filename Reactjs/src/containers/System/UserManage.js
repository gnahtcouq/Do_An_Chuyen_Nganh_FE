import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import './UserManage.scss'
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService
} from '../../services/userService'
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'
import {emitter} from '../../utils/emitter'
class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {}
    }
  }

  async componentDidMount() {
    await this.getAllUsersFromReact()
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers('ALL')
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users
      })
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true
    })
  }

  toggleModalUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser
    })
  }

  toggleModalEditUser = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser
    })
  }

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data)
      if (response && response.errCode !== 0) {
        alert(response.errMessage)
      } else {
        await this.getAllUsersFromReact()
        this.setState({
          isOpenModalUser: false
        })

        emitter.emit('EVENT_CLEAR_MODAL_DATA')
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id)
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact()
      } else {
        alert(res.errMessage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleEditUser = (user) => {
    console.log('check edit user', user)
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user
    })
  }

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user)
      if (res && res.errCode === 0) {
        await this.setState({
          isOpenModalEditUser: false
        })
        this.getAllUsersFromReact()
      } else {
        alert(res.errMessage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Life cycle
  //  Run component
  //  1. Run construct -> init state
  //  2. Did mount (set state)
  //  3. Renderw

  render() {
    console.log('check props from parent: ', this.props)
    let arrUsers = this.state.arrUsers

    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleModalUser}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleModalEditUser}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fa-solid fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          {arrUsers && arrUsers.length > 0 ? (
            <table id="customers">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
                {arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
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
          ) : (
            <p>No users available.</p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
