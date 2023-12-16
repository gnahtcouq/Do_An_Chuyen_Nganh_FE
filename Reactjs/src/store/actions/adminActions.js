import actionTypes from './actionTypes'
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService
} from '../../services/userService'
import {toast} from 'react-toastify'

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

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData
})

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL
})

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

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData
})

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data)
      if (res && res.errCode === 0) {
        toast.success('Create new user success!')
        dispatch(saveUserSuccess())
        dispatch(fetchAllUsersStart())
      } else {
        toast.error('Create new user error!')
        dispatch(saveUserFail())
      }
    } catch (error) {
      dispatch(saveUserFail())
      console.log('saveUserFail error', error)
    }
  }
}

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL
})

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers('ALL')
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()))
      } else {
        toast.error('Fetch all users error!')
        dispatch(fetchAllUsersFail())
      }
    } catch (error) {
      toast.error('Fetch all users error!')
      dispatch(fetchAllUsersFail())
      console.log('fetchAllUsersFail error', error)
    }
  }
}

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data
})

export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId)
      if (res && res.errCode === 0) {
        toast.success('Delete user success!')
        dispatch(saveUserSuccess())
        dispatch(fetchAllUsersStart())
      } else {
        toast.error('Delete user error!')
        dispatch(saveUserFail())
      }
    } catch (error) {
      toast.error('Delete user error!')
      dispatch(saveUserFail())
      console.log('saveUserFail error', error)
    }
  }
}

export const deleteUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS
})

export const deleteUserFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data)
      if (res && res.errCode === 0) {
        toast.success('Update user success!')
        dispatch(editUserSuccess())
        dispatch(fetchAllUsersStart())
      } else {
        toast.error('Update user error!')
        dispatch(editUserFail())
      }
    } catch (error) {
      toast.error('Update user error!')
      dispatch(editUserFail())
      console.log('saveUserFail error', error)
    }
  }
}

export const editUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL
})
