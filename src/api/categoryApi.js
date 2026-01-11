import axiosClient from './axiosClient'

const categoryApi = {
  getAll: () => {
    return axiosClient.get('/category/list')
  }
}

export default categoryApi
