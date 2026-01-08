import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authApi from '../api/authApi'
import { toast } from 'react-toastify'

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Kiểm tra mật khẩu trùng khớp
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không trùng khớp!')
      return
    }

    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!')
      return
    }

    try {
      const response = await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
      if (response.data.status) {
        // Thông báo thành công và nhắc người dùng check mail
        toast.success('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.')
        navigate('/login')
      }
    } catch (err) {
      // Hiển thị lỗi từ backend (ví dụ: "Username đã tồn tại")
      const errMsg = err.response?.data?.message || 'Đăng ký thất bại'
      toast.error(errMsg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">Tạo tài khoản</h2>
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
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Email"
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value
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
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({
                ...formData,
                confirmPassword: e.target.value
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-gray-600 hover:text-gray-900"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-vn-red text-white rounded-md hover:bg-red-700">
            Đăng ký
          </button>
        </form>
        <p className="text-center text-sm">
          Đã có tài khoản? <Link to="/login" className="text-vn-red font-bold">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}

export default Register