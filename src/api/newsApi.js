import axiosClient from './axiosClient'

const newsApi = {
  getAll: (params) => {
    const url = '/news' // Khớp với router backend của bạn
    return axiosClient.get(url, { params })
  },
  // API dành riêng cho Admin
  getAllAdmin: (params) => {
    const url = '/admin/news/news-list' // Khớp với route trong NewsController.js
    return axiosClient.get(url, { params })
  },

  // Thêm mới bằng JSON
  create: (data) => {
    return axiosClient.post('/admin/news/insert-news', data)
  },

  // Cập nhật bằng JSON
  update: (data) => {
    return axiosClient.post('/admin/news/update-news', data)
  },

  delete: (id) => {
    return axiosClient.delete(`/admin/news/delete-news?id=${id}`)
  },

  getById: (id) => {
    const url = `/news/${id}`
    return axiosClient.get(url)
  }
}

export default newsApi
