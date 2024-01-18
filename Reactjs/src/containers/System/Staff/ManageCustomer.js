import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import './ManageCustomer.scss'
import DatePicker from '../../../components/Input/DatePicker'
import {
  getAllCustomerForStaff,
  postSendRemedy
} from '../../../services/userService'
import moment from 'moment'
import {LANGUAGES} from '../../../utils'
import RemedyModal from './RemedyModal'
import {toast} from 'react-toastify'
import LoadingOverlay from 'react-loading-overlay'

class ManageCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      customerData: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false
    }
  }

  async componentDidMount() {
    this.getDataCustomer()
  }

  getDataCustomer = async () => {
    let {user} = this.props
    let {currentDate} = this.state
    let formattedDate = new Date(currentDate).getTime()
    let res = await getAllCustomerForStaff({
      staffId: user.id,
      date: formattedDate
    })
    if (res && res.errCode === 0) {
      this.setState({
        customerData: res.data
      })
    }
    // console.log('getDataCustomer', res)
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
      async () => {
        await this.getDataCustomer()
      }
    )
  }

  handleBtnConfirm = (item) => {
    // console.log('check btn', item)
    let data = {
      staffId: item.staffId,
      customerId: item.customerId,
      email: item.customerData.email,
      timeType: item.timeType,
      customerName: item.customerData.firstName
    }
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data
    })
    // console.log('check data', data)
  }

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {}
    })
  }

  sendRemedy = async (dataChild) => {
    let {dataModal} = this.state
    this.setState({
      isShowLoading: true
    })

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      staffId: dataModal.staffId,
      customerId: dataModal.customerId,
      timeType: dataModal.timeType,
      language: this.props.language,
      customerName: dataModal.customerName
    })
    // console.log('parent check modal', res)
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false
      })
      toast.success('Gửi hoá đơn thành công')
      this.closeRemedyModal()
      await this.getDataCustomer()
    } else {
      this.setState({
        isShowLoading: false
      })
      toast.error('Gửi hoá đơn thất bại')
    }
  }

  render() {
    // console.log('customerData', this.state)
    let {customerData, isOpenRemedyModal, dataModal} = this.state
    let {language} = this.props
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Đang gửi hoá đơn..."
        >
          <div className="manage-customer-container">
            <div className="manage-customer-title">Quản lý khách hàng</div>
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
                <table className="table table-bordered mt-4 mx-1">
                  <thead>
                    <tr>
                      <th>Mã đặt lịch</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerData && customerData.length > 0 ? (
                      customerData.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataCustomer.valueVi
                            : item.timeTypeDataCustomer.valueEn
                        let gender =
                          language === LANGUAGES.VI
                            ? item.customerData.genderData.valueVi
                            : item.customerData.genderData.valueEn
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{time}</td>
                            <td>{item.customerData.firstName}</td>
                            <td>{item.customerData.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{textAlign: 'center'}}>
                          Không có dữ liệu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
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
