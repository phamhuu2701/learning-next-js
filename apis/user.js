import apiCaller from '../utils/apiCaller'

const login = async ({ username, password }) => {
  return await apiCaller(`/users/login`, 'POST', { username, password })
}

const getUserByToken = async () => {
  return await apiCaller(`/users/me`)
}

const UserApi = {
  login,
  getUserByToken,
}

export default UserApi
