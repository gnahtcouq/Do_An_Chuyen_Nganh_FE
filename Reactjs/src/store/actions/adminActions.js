import actionTypes from './actionTypes'
import {
  getAllCodeService,
  createNewUserService
} from '../../services/userService'

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START
      })
      let res = await getAllCodeService('GENDER')
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data))
      } else {
        dispatch(fetchGenderFail())
      }
    } catch (error) {
      dispatch(fetchGenderFail())
      console.log('fetchGenderFail error', error)
    }
  }
}

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('ROLE')
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data))
      } else {
        dispatch(fetchRoleFail())
      }
    } catch (error) {
      dispatch(fetchRoleFail())
      console.log('fetchRoleFail error', error)
    }
  }
}

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data)
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess())
      } else {
        dispatch(saveUserFail())
      }
    } catch (error) {
      dispatch(saveUserFail())
      console.log('saveUserFail error', error)
    }
  }
}

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData
})

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData
})

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL
})

export const saveUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS'
})

export const saveUserFail = () => ({
  type: 'CREATE_USER_FAIL'
})
