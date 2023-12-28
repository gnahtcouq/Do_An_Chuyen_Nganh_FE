import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import './ManageStaff.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select'
import {CRUD_ACTIONS, LANGUAGES} from '../../../utils'
import {getDetailInfoStaff} from '../../../services/userService'
import {has} from 'lodash'

const mdParser = new MarkdownIt(/* Markdown-it options */)

class ManageStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: '',
      description: '',
      listStaff: [],
      hasOldData: false
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
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allStaff)
    //   this.setState({listStaff: dataSelect})
    // }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allStaff)
      for (let i = 0; i < dataSelect.length; i++) {
        if (dataSelect[i].value === this.state.selectedOption.value) {
          let label = dataSelect[i].label
          let value = dataSelect[i].value
          this.setState({
            selectedOption: {label, value}
          })
          break
        }
      }
      this.setState({
        listStaff: dataSelect
      })
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
    let {hasOldData} = this.state
    this.props.saveDetailStaff({
      staffId: this.state.selectedOption.value,
      description: this.state.description,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
    })
    // console.log('check state', this.state)
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({selectedOption})
    let res = await getDetailInfoStaff(selectedOption.value)
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown
      this.setState({
        description: markdown.description,
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        hasOldData: true
      })
    } else {
      this.setState({
        description: '',
        contentHTML: '',
        contentMarkdown: '',
        hasOldData: false
      })
    }
  }

  handleOnChangeDes = (event) => {
    this.setState({description: event.target.value})
  }

  render() {
    // console.log('check state', this.state)
    let {hasOldData} = this.state
    return (
      <div className="manage-staff-container">
        <div className="manage-staff-title">Tạo thêm thông tin nhân viên</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn nhân viên</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
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
            value={this.state.contentMarkdown}
          />
        </div>
        <div className="my-3 d-flex justify-content-end">
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className={
              hasOldData === true ? 'btn btn-primary' : 'btn btn-warning'
            }
          >
            {hasOldData === true ? (
              <span>Lưu thông tin</span>
            ) : (
              <span>Tạo thông tin</span>
            )}
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
