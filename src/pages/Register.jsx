import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authApi from '../api/authApi'

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authApi.register(formData)
      if (response.data.status) {
        alert('Đăng ký thành công!')
        navigate('/login')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">Tạo tài khoản</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Tên đăng nhập"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Mật khẩu"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
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