import axiosClient from './axiosClient'

const authApi = {
  register: (data) => {
    const url = '/authenticate/register'
    return axiosClient.post(url, data)
  },
  login: (data) => {
    const url = '/authenticate/login'
    return axiosClient.post(url, data)
  },
  // Nếu bạn muốn kiểm tra trạng thái token từ FE
  activate: (token) => {
    return axiosClient.get(`/authenticate/activate/${token}`)
  }
}

export default authApi