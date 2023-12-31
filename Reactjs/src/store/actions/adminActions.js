import actionTypes from './actionTypes'
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopStaffHomeService,
  getAllStaff,
  saveDetailStaffService
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

// export const createNewUser = (data) => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await createNewUserService(data)
//       if (res && res.errCode === 0) {
//         toast.success('Create new user success!')
//         dispatch(saveUserSuccess())
//         dispatch(fetchAllUsersStart())
//       } else {
//         toast.error('Create new user error!')
//         dispatch(saveUserFail())
//       }
//     } catch (error) {
//       dispatch(saveUserFail())
//       console.log('saveUserFail error', error)
//     }
//   }
// }

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      // Fetch all users
      let usersRes = await getAllUsers('ALL')
      if (usersRes && usersRes.errCode === 0) {
        // Check if a user with the same email already exists
        const isEmailExists = usersRes.users.some(
          (user) => user.email === data.email
        )

        if (isEmailExists) {
          toast.error('Email already exists!') // Display an error message
          return
        }

        // If email is unique, proceed to create a new user
        let res = await createNewUserService(data)
        if (res && res.errCode === 0) {
          toast.success('Create new user success!')
          dispatch(saveUserSuccess())
          dispatch(fetchAllUsersStart())
        } else {
          toast.error('Create new user error!')
          dispatch(saveUserFail())
        }
      } else {
        toast.error('Fetch all users error!')
        dispatch(fetchAllUsersFail())
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

// let res1 = await getTopStaffHomeService('')

export const fetchTopStaffs = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopStaffHomeService('')
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_STAFFS_SUCCESS,
          dataStaff: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_STAFFS_FAIL
        })
      }
    } catch (error) {
      console.log('fetchTopStaffs error', error)
      dispatch({
        type: actionTypes.FETCH_TOP_STAFFS_FAIL
      })
    }
  }
}

export const fetchAllStaff = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllStaff()
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_STAFFS_SUCCESS,
          dataStaff: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_STAFFS_FAIL
        })
      }
    } catch (error) {
      console.log('fetchAllStaffs error', error)
      dispatch({
        type: actionTypes.FETCH_ALL_STAFFS_FAIL
      })
    }
  }
}

export const saveDetailStaff = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailStaffService(data)
      if (res && res.errCode === 0) {
        toast.success('Save detail info staff success!')
        dispatch({
          type: actionTypes.SAVE_DETAIL_STAFF_SUCCESS,
          dataStaff: res.data
        })
      } else {
        console.log('saveDetailStaff error', res)
        toast.error('Save detail info staff error!')
        dispatch({
          type: actionTypes.SAVE_DETAIL_STAFF_FAIL
        })
      }
    } catch (error) {
      toast.error('Save detail info staff error!')
      console.log('saveDetailStaff error', error)
      dispatch({
        type: actionTypes.SAVE_DETAIL_STAFF_FAIL
      })
    }
  }
}

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('TIME')
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
        })
      }
    } catch (error) {
      console.log('fetchAllScheduleTime error', error)
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
      })
    }
  }
}

export const getRequiredStaffInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_STAFF_INFO_START
      })
      let resPrice = await getAllCodeService('PRICE')
      let resPayment = await getAllCodeService('PAYMENT')
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data
        }
        dispatch(fetchRequiredStaffInfoSuccess(data))
      } else {
        dispatch(fetchRequiredStaffInfoFail())
      }
    } catch (error) {
      dispatch(fetchRequiredStaffInfoFail())
      console.log('fetchRequiredStaffInfo error', error)
    }
  }
}

export const fetchRequiredStaffInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_STAFF_INFO_SUCCESS,
  data: allRequiredData
})

export const fetchRequiredStaffInfoFail = () => ({
  type: actionTypes.FETCH_REQUIRED_STAFF_INFO_FAIL
})
