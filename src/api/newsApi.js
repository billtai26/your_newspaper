import axiosClient from './axiosClient'

const newsApi = {
  getAll: (params) => {
    const url = '/news' // Khớp với router backend của bạn
    return axiosClient.get(url, { params })
  },
  getById: (id) => {
    const url = `/news/${id}`
    return axiosClient.get(url)
  }
}

export default newsApi
