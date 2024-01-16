import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import './ManageCustomer.scss'
import DatePicker from '../../../components/Input/DatePicker'
import {getAllCustomerForStaff} from '../../../services/userService'
import moment from 'moment'

class ManageCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataCustomer: []
    }
  }

  async componentDidMount() {
    let {user} = this.props
    let {currentDate} = this.state
    let formatedDate = new Date(currentDate).getTime()
    this.getDataCustomer(user, formatedDate)
  }

  getDataCustomer = async (user, formatedDate) => {
    let res = await getAllCustomerForStaff({
      staffId: user.id,
      date: formatedDate
    })
    if (res && res.errCode === 0) {
      this.setState({
        dataCustomer: res.data
      })
    }
    console.log('getDataCustomer', res)
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0]
      },
      () => {
        let {user} = this.props
        let {currentDate} = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getDataCustomer(user, formatedDate)
      }
    )
  }

  handleBtnConfirm = () => {}

  handleBtnRemedy = () => {}

  render() {
    // console.log('dataCustomer', this.props)

    let {dataCustomer} = this.state
    return (
      <div className="manage-customer-container">
        <div className="manage-customer-title">Quản lý lịch hẹn</div>
        <div className="manage-customer-body row">
          <div className="col-4 form-group">
            <label>Chọn ngày</label>
            <DatePicker
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
              value={this.state.currentDate}
            />
          </div>

          <div className="col-12 table-manage-customer">
            <table style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ và tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Hành động</th>
                </tr>
                {dataCustomer && dataCustomer.length > 0 ? (
                  dataCustomer.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.timeTypeDataCustomer.valueVi}</td>
                        <td>{item.customerData.firstName}</td>
                        <td>{item.customerData.address}</td>
                        <td>{item.customerData.genderData.valueVi}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => this.handleBtnConfirm(item)}
                          >
                            Xác nhận
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => this.handleBtnRemedy(item)}
                          >
                            Gửi hoá đơn
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>Không có dữ liệu</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer)
