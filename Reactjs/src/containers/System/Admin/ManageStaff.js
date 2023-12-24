import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import './ManageStaff.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select'
import {LANGUAGES} from '../../../utils'

const mdParser = new MarkdownIt(/* Markdown-it options */)

class ManageStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: '',
      description: '',
      listStaff: []
    }
  }

  componentDidMount() {
    this.props.fetchAllStaff()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allStaff !== this.props.allStaff) {
      let dataSelect = this.buildDataInputSelect(this.props.allStaff)
      this.setState({listStaff: dataSelect})
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allStaff)
      this.setState({listStaff: dataSelect})
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = []
    let {language} = this.props
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {}
        let labelVi = `${item.lastName} ${item.firstName}`
        let labelEn = `${item.firstName} ${item.lastName}`
        object.label = language === LANGUAGES.VI ? labelVi : labelEn
        object.value = item.id
        result.push(object)
      })
    }
    return result
  }

  handleEditorChange = ({html, text}) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html
    })
  }

  handleSaveContentMarkdown = () => {
    this.props.saveDetailStaff({
      staffId: this.state.selectedOption.value,
      description: this.state.description,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown
    })
    console.log('check state', this.state)
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption})
  }

  handleOnChangeDes = (event) => {
    this.setState({description: event.target.value})
  }

  render() {
    console.log('check state', this.state)
    return (
      <div className="manage-staff-container">
        <div className="manage-staff-title">Tạo thêm thông tin nhân viên</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn nhân viên</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listStaff}
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
    language: state.app.language,
    allStaff: state.admin.allStaff
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStaff: () => dispatch(actions.fetchAllStaff()),
    saveDetailStaff: (data) => dispatch(actions.saveDetailStaff(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff)
