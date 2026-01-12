import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Đảm bảo port này khớp với backend của bạn
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor để tự động đính kèm Token vào Header mỗi khi gọi API
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // Giả sử bạn lưu token với key 'token'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosClient
