import axiosClient from './axiosClient'

const categoryApi = {
  getAll: () => {
    return axiosClient.get('/category/list')
  },

  getAllAdmin: (page = 1, size = 10) => {
    return axiosClient.get(`/admin/category/list?page=${page}&size=${size}`)
  },

  // Thêm hàm create mới
  create: (data) => {
    return axiosClient.post('/admin/category/add', data)
  },

  update: (data) => {
    // Backend yêu cầu body gồm { Id, Name, ParentId }
    return axiosClient.put('/admin/category/update', data)
  },

  delete: (id) => {
    return axiosClient.delete(`/admin/category/delete?id=${id}`)
  }
}

export default categoryApi
