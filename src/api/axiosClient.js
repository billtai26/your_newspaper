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

axiosClient.interceptors.response.use(
  (response) => {
    return response // Nếu response thành công, trả về bình thường
  },
  (error) => {
    // Nếu server trả về lỗi 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // 1. Xóa sạch thông tin đăng nhập trong localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('username')

      // 2. Thông báo cho người dùng (tùy chọn)
      // window.alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.")

      // 3. Chuyển hướng về trang login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosClient
