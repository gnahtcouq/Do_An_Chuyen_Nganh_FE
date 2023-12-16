import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import {LANGUAGES} from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app
import TableManageUser from './TableManageUser'

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      roleArr: [],
      previewImgURL: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      role: '',
      avatar: ''
    }
  }

  async componentDidMount() {
    this.props.getGenderStart()
    this.props.getRoleStart()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
      })
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
      })
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        role: '',
        avatar: ''
      })
    }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files
    let file = data[0]
    if (file) {
      let objectUrl = URL.createObjectURL(file)
      this.setState({
        previewImgURL: objectUrl,
        avatar: file
      })
    }
  }

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return
    this.setState({
      isOpen: true
    })
  }

  handleSaveUser = () => {
    let isValid = this.checkValidateInput()
    if (isValid === false) return

    // fire redux action
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role
    })

    this.props.fetchUserRedux()
  }

  checkValidateInput = () => {
    let isValid = true
    let arrCheck = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address'
    ]
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false
        alert('Missing parameter: ' + arrCheck[i])
        break
      }
    }
    return isValid
  }

  onChangeInput = (event, id) => {
    let copyState = {...this.state}
    copyState[id] = event.target.value
    this.setState({
      ...copyState
    })
  }

  render() {
    let genders = this.state.genderArr
    let roles = this.state.roleArr
    let language = this.props.language
    let isGetGenders = this.props.isLoadingGender

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
      avatar
    } = this.state

    return (
      <div className="user-redux-container">
        <div className="title">MANAGE USERS REDUX</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <div className="col-12 my-3">
                  {isGetGenders === true ? 'Loading genders' : ''}
                </div>
                <FormattedMessage id="manage-user.add" />
              </div>

              <div className="col-4 my-2">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    accept="image/*"
                    required
                    onChange={(event) => this.handleOnChangeImage(event)}
                  ></input>
                  <label className="label-upload" htmlFor="previewImg">
                    <i className="fas fa-upload"></i>Chọn ảnh
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>

              <div className="col-8">
                <div className="row">
                  <div className="col-12 my-2">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      onChange={(event) => {
                        this.onChangeInput(event, 'email')
                      }}
                    ></input>
                  </div>

                  <div className="col-12 my-3">
                    <label>
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(event) => {
                        this.onChangeInput(event, 'password')
                      }}
                    ></input>
                  </div>

                  <div className="col-4 my-2">
                    <label>
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={firstName}
                      onChange={(event) => {
                        this.onChangeInput(event, 'firstName')
                      }}
                    ></input>
                  </div>

                  <div className="col-4 my-2">
                    <label>
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={lastName}
                      onChange={(event) => {
                        this.onChangeInput(event, 'lastName')
                      }}
                    ></input>
                  </div>

                  <div className="col-4 my-2">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        this.onChangeInput(event, 'gender')
                      }}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          )
                        })}
                    </select>
                  </div>

                  <div className="col-8 my-2">
                    <label>
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={phoneNumber}
                      onChange={(event) => {
                        this.onChangeInput(event, 'phoneNumber')
                      }}
                    ></input>
                  </div>

                  <div className="col-4 my-2">
                    <label>
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        this.onChangeInput(event, 'role')
                      }}
                    >
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          )
                        })}
                    </select>
                  </div>

                  <div className="col-12 my-2">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={address}
                      onChange={(event) => {
                        this.onChangeInput(event, 'address')
                      }}
                    ></input>
                  </div>
                </div>
              </div>

              <div className="col-12 my-3 d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleSaveUser()}
                >
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>

              <div className="col-12 mb-5">
                <TableManageUser />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({isOpen: false})}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
