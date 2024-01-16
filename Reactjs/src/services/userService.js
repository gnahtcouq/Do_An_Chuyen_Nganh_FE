import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post('/api/login', {email: userEmail, password: userPassword})
}

const getAllUsers = (inputId) => {
  // template string
  return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
  // console.log('check data from react: ', data)
  return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', {
    data: {
      id: userId
    }
  })
}

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopStaffHomeService = (limit) => {
  return axios.get(`/api/top-staff-home?limit=${limit}`)
}

const getAllStaff = () => {
  return axios.get(`/api/get-all-staff`)
}

const saveDetailStaffService = (data) => {
  return axios.post('/api/save-info-staff', data)
}

const getDetailInfoStaff = (inputId) => {
  return axios.get(`/api/get-detail-staff-by-id?id=${inputId}`)
}

const saveBulkScheduleStaff = (data) => {
  return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleStaffByDate = (staffId, date) => {
  return axios.get(
    `/api/get-schedule-staff-by-date?staffId=${staffId}&date=${date}`
  )
}

const getExtraInfoStaffById = (staffId) => {
  return axios.get(`/api/get-extra-info-staff-by-id?staffId=${staffId}`)
}

const getProfileStaffById = (staffId) => {
  return axios.get(`/api/get-profile-staff-by-id?staffId=${staffId}`)
}

const postCustomerBookAppointment = (data) => {
  return axios.post('/api/customer-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
  return axios.post('/api/verify-book-appointment', data)
}

const getAllCustomerForStaff = (data) => {
  return axios.get(
    `/api/get-list-customer-for-staff?staffId=${data.staffId}&date={data.date}`
  )
}

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopStaffHomeService,
  getAllStaff,
  saveDetailStaffService,
  getDetailInfoStaff,
  saveBulkScheduleStaff,
  getScheduleStaffByDate,
  getExtraInfoStaffById,
  getProfileStaffById,
  postCustomerBookAppointment,
  postVerifyBookAppointment,
  getAllCustomerForStaff
}
