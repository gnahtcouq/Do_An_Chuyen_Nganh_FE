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

const mdParser = new MarkdownIt(/* Markdown-it options */)

class ManageStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // sa ve to markdowns table
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: '',
      description: '',
      listStaff: [],
      hasOldData: false,

      // save to staff_info table
      listPrice: [],
      listPayment: [],
      selectedPrice: '',
      selectedPayment: '',
      note: ''
    }
  }

  componentDidMount() {
    this.props.fetchAllStaff()
    this.props.getRequiredStaffInfor()
  }

  buildDataInputSelect = (inputData, type) => {
    let result = []
    let {language} = this.props
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {}
        let labelVi =
          type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
        let labelEn =
          type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn
        object.label = language === LANGUAGES.VI ? labelVi : labelEn
        object.value = item.id
        result.push(object)
      })
    }
    return result
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allStaff !== this.props.allStaff) {
      let dataSelect = this.buildDataInputSelect(this.props.allStaff, 'USERS')
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

    if (prevProps.allRequiredStaffInfo !== this.props.allRequiredStaffInfo) {
      let {resPayment, resPrice} = this.props.allRequiredStaffInfo
      let dataSelectPrice = this.buildDataInputSelect(resPrice)
      let dataSelectPayment = this.buildDataInputSelect(resPayment)

      console.log('check data', dataSelectPrice, dataSelectPayment)

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment
      })
    }
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
        <div className="manage-staff-title">
          <FormattedMessage id="admin.manage-staff.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-staff.select-staff" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listStaff}
              placeholder={'Chọn nhân viên'}
            />
          </div>
          <div className="content-right form-group">
            <label>
              <FormattedMessage id="admin.manage-staff.intro" />
            </label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleOnChangeDes(event)}
              value={this.state.description}
            >
              lorem
            </textarea>
          </div>
        </div>

        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá</label>
            <Select
              value={this.state.selectedOption}
              // onChange={this.handleChangeSelect}
              options={this.state.listPrice}
              placeholder={'Chọn giá'}
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán</label>
            <Select
              value={this.state.selectedOption}
              // onChange={this.handleChangeSelect}
              options={this.state.listPayment}
              placeholder={'Chọn phương thức thanh toán'}
            />
          </div>
          <div className="col-4 form-group">
            <label>Ghi chú</label>
            <input className="form-control"></input>
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
              <span>
                <FormattedMessage id="admin.manage-staff.save" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="admin.manage-staff.add" />
              </span>
            )}
          </button>
          <button className="btn btn-secondary">
            <FormattedMessage id="admin.manage-staff.cancel" />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allStaff: state.admin.allStaff,
    allRequiredStaffInfo: state.admin.allRequiredStaffInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStaff: () => dispatch(actions.fetchAllStaff()),
    getRequiredStaffInfor: () => dispatch(actions.getRequiredStaffInfor()),
    saveDetailStaff: (data) => dispatch(actions.saveDetailStaff(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff)
