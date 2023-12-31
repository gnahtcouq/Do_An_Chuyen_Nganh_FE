import actionTypes from '../actions/actionTypes'

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topStaffs: [],
  allStaff: [],
  allScheduleTime: [],

  allRequiredStaffInfo: []
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = {...state}
      copyState.isLoadingGender = true
      return {
        ...copyState
      }

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data
      state.isLoadingGender = false
      return {
        ...state
      }

    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false
      state.genders = []
      return {
        ...state
      }

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data
      return {
        ...state
      }

    case actionTypes.FETCH_ROLE_FAIL:
      state.roles = []
      return {
        ...state
      }

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users
      return {
        ...state
      }

    case actionTypes.FETCH_ALL_USERS_FAIL:
      state.users = []
      return {
        ...state
      }

    case actionTypes.FETCH_TOP_STAFFS_SUCCESS:
      state.topStaffs = action.dataStaff
      return {
        ...state
      }

    case actionTypes.FETCH_TOP_STAFFS_FAIL:
      state.topStaffs = []
      return {
        ...state
      }

    case actionTypes.FETCH_ALL_STAFFS_SUCCESS:
      state.allStaff = action.dataStaff
      return {
        ...state
      }

    case actionTypes.FETCH_ALL_STAFFS_FAIL:
      state.allStaff = []
      return {
        ...state
      }

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime
      return {
        ...state
      }

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
      state.allScheduleTime = []
      return {
        ...state
      }

    case actionTypes.FETCH_REQUIRED_STAFF_INFO_SUCCESS:
      state.allRequiredStaffInfo = action.data
      // console.log('data action', action)
      return {
        ...state
      }

    case actionTypes.FETCH_REQUIRED_STAFF_INFO_FAIL:
      state.allRequiredStaffInfo = []
      return {
        ...state
      }

    default:
      return state
  }
}

export default adminReducer
