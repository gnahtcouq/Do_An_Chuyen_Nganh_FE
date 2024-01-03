import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import './ManageCustomer.scss'
import DatePicker from '../../../components/Input/DatePicker'

class ManageCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: new Date()
    }
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0]
    })
  }
  render() {
    return (
      <div className="manage-customer-container">
        <div className="manage-customer-title">Quản lý lịch hẹn</div>
        <div className="manage-customer-body row">
          <div className="col-4 form-group">
            <label>Chọn ngày</label>
            <DatePicker
              value={this.state.currentDate}
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
            />
          </div>

          <div className="col-12 table-manage-customer">
            <table style={{width: '100%'}}>
              <tr>
                <th>Name</th>
                <th colSpan="2">Telephone</th>
              </tr>
              <tr>
                <td>B</td>
                <td>A</td>
                <td>C</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer)
