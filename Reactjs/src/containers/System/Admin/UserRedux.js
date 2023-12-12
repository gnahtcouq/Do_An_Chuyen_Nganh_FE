import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import {LANGUAGES} from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      roleArr: []
    }

    this.dropContainerRef = React.createRef()
    this.fileInputRef = React.createRef()

    // Bind the event handlers to the class instance
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
  }

  async componentDidMount() {
    this.props.getGenderStart()
    this.props.getRoleStart()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux
      })
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux
      })
    }
  }

  handleDragOver = (e) => {
    e.preventDefault()
  }

  handleDragEnter = () => {
    this.dropContainerRef.current.classList.add('drag-active')
  }

  handleDragLeave = () => {
    this.dropContainerRef.current.classList.remove('drag-active')
  }

  handleDrop = (e) => {
    e.preventDefault()
    this.dropContainerRef.current.classList.remove('drag-active')
    this.fileInputRef.current.files = e.dataTransfer.files
  }

  render() {
    let genders = this.state.genderArr
    let roles = this.state.roleArr
    let language = this.props.language
    let isGetGenders = this.props.isLoadingGender
    console.log('check props from component', this.state)
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

              <div className="col-6 my-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input className="form-control" type="email"></input>
              </div>

              <div className="col-6 my-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input className="form-control" type="password"></input>
              </div>

              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input className="form-control" type="text"></input>
              </div>

              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input className="form-control" type="text"></input>
              </div>

              <div className="col-2 my-2">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select className="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      )
                    })}
                </select>
              </div>

              <div className="col-4 my-2">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input className="form-control" type="text"></input>
              </div>

              <div className="col-9 my-2">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input className="form-control" type="text"></input>
              </div>

              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select className="form-control">
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      )
                    })}
                </select>
              </div>

              <div className="col-12">
                <label
                  className="drop-container"
                  ref={this.dropContainerRef}
                  onDragOver={this.handleDragOver}
                  onDragEnter={this.handleDragEnter}
                  onDragLeave={this.handleDragLeave}
                  onDrop={this.handleDrop}
                >
                  <span className="drop-title">
                    <FormattedMessage id="manage-user.image" />
                  </span>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    required
                    ref={this.fileInputRef}
                  ></input>
                </label>
              </div>

              <div className="col-12 mt-3">
                <button className="btn btn-primary">
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
