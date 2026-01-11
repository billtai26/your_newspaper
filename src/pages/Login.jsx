import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authApi from '../api/authApi'
import { toast } from 'react-toastify'

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authApi.login(formData)
      if (response.data.status) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('username', response.data.username) // Thêm dòng này

        toast.success('Chào mừng bạn quay trở lại!')

        if (response.data.role === 'admin') navigate('/admin')
        else navigate('/')
      }
    } catch (err) {
      const status = err.response?.status
      const errMsg = err.response?.data?.message || 'Đăng nhập thất bại'

      if (status === 403) {
        // Đây là lỗi tài khoản chưa kích hoạt
        toast.warning(errMsg)
      } else {
        toast.error(errMsg)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">Đăng nhập</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Tên đăng nhập"
            onChange={(e) => setFormData({
              ...formData,
              username: e.target.value
            })}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) => setFormData({
                ...formData,
                password: e.target.value
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-vn-red text-white rounded-md hover:bg-red-700">
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-sm">
          Chưa có tài khoản? <Link to="/register" className="text-vn-red font-bold">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  )
}

export default Login