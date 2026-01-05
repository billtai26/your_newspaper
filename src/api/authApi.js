import axiosClient from './axiosClient'

const authApi = {
  register: (data) => {
    const url = '/authenticate/register'
    return axiosClient.post(url, data)
  },
  login: (data) => {
    const url = '/authenticate/login'
    return axiosClient.post(url, data)
  }
}

export default authApi