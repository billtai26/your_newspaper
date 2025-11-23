import { X } from 'lucide-react'

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    // SỬA LỖI 1: Thay z-[60] thành z-60
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">

      {/* Hộp thoại chính (Modal Content) */}
      <div className="bg-white w-full max-w-[500px] rounded-lg shadow-2xl relative animate-in zoom-in-95 duration-200">

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://s4.vnecdn.net/vnexpress/restruct/i/v9739/v2_2019/pc/graphics/logo.svg"
              alt="VnExpress"
              className="h-8"
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-2xl font-serif font-bold text-center text-gray-800 mb-6">
            Đăng nhập / Tạo tài khoản
          </h2>

          {/* Form Email */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              {/* SỬA LỖI 2 & 3: Thay mã hex bằng vn-red */}
              <input
                type="email"
                placeholder="Nhập Email của bạn"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:border-vn-red focus:ring-1 focus:ring-vn-red outline-none transition-all"
              />
            </div>

            <button className="w-full bg-[#757575] hover:bg-[#555] text-white font-bold py-3 rounded transition-colors">
              Tiếp tục
            </button>
          </div>

          {/* Divider (Hoặc) */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-4">
            {/* Google */}
            <button className="flex flex-col items-center justify-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors group">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs font-medium text-gray-600 group-hover:text-black">Google</span>
            </button>

            {/* Facebook */}
            <button className="flex flex-col items-center justify-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors group">
              <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs font-medium text-gray-600 group-hover:text-black">Facebook</span>
            </button>

            {/* Apple */}
            <button className="flex flex-col items-center justify-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors group">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.37-1.32 1.58.24 2.85.94 3.66 2.06-3.27 1.68-2.6 6.13.9 7.42-.58 1.58-1.53 3.01-2.9 4.47zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-xs font-medium text-gray-600 group-hover:text-black">Apple</span>
            </button>
          </div>

          {/* Footer Terms */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Tiếp tục là đồng ý với <a href="#" className="underline hover:text-gray-800">điều khoản sử dụng</a> và <a href="#" className="underline hover:text-gray-800">chính sách bảo mật</a> của VnExpress. Tài khoản của bạn được reCAPTCHA bảo vệ.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
