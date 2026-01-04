import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Đảm bảo port này khớp với backend của bạn
  headers: {
    'Content-Type': 'application/json'
  }
})

// Bạn có thể thêm interceptors ở đây để xử lý token (JWT) sau này
export default axiosClient
