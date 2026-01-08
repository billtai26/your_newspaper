import React, { useEffect, useRef } from 'react' // Thêm useRef
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '../api/authApi'

const ActivateAccount = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  // Tạo một "khóa" để ngăn gọi API lần 2
  const initialized = useRef(false)

  useEffect(() => {
    // Nếu đã chạy rồi thì thoát ra, không làm gì cả
    if (initialized.current) return

    // Đánh dấu là đã chạy
    initialized.current = true

    const verifyAccount = async () => {
      try {
        const response = await authApi.activate(token)
        if (response.data.status) {
          toast.success('Kích hoạt tài khoản thành công! Bạn có thể đăng nhập.')
          navigate('/login')
        }
      } catch (error) {
        // Chỉ hiện lỗi nếu thực sự có lỗi từ server
        toast.error(error.response?.data?.message || 'Mã kích hoạt không hợp lệ.')
        navigate('/login')
      }
    }

    if (token) {
      verifyAccount()
    }
  }, [token, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Đang xác thực tài khoản...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
      </div>
    </div>
  )
}

export default ActivateAccount