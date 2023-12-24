import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import './ManageStaff.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select'

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
]

const mdParser = new MarkdownIt(/* Markdown-it options */)

class ManageStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: '',
      description: ''
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleEditorChange = ({html, text}) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html
    })
  }

  handleSaveContentMarkdown = () => {
    console.log('check state', this.state)
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption})
  }

  handleOnChangeDes = (event) => {
    this.setState({description: event.target.value})
  }

  render() {
    return (
      <div className="manage-staff-container">
        <div className="manage-staff-title">Tạo thêm thông tin nhân viên</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn nhân viên</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="content-right form-group">
            <label>Thông tin giới thiệu:</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDes(event)}
              value={this.state.description}
            >
              lorem
            </textarea>
          </div>
        </div>
        <div className="manage-staff-editor">
          <MdEditor
            style={{height: '500px'}}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <div className="my-3 d-flex justify-content-end">
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className="btn btn-warning"
          >
            Lưu thông tin
          </button>
          <button className="btn btn-secondary">Huỷ bỏ</button>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff)
