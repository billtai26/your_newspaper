import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-gray-300 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Tờ Báo Điện Tử</h3>
            <p className="text-sm leading-relaxed mb-4">
              Nền tảng tin tức hàng đầu cung cấp thông tin nhanh, chính xác và toàn diện về các sự kiện trong nước và quốc tế.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition duration-300" title="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition duration-300" title="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition duration-300" title="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition duration-300" title="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-red-400 transition duration-300" title="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Danh Mục</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Trang Chủ</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Tin Tức</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Thể Thao</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Kinh Tế</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Công Nghệ</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Pháp Lý</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Điều Khoản Sử Dụng</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Chính Sách Riêng Tư</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Chính Sách Cookie</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Liên Hệ Quảng Cáo</a></li>
              <li><a href="#" className="text-sm hover:text-white transition duration-300">Bản Quyền</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Liên Hệ</h4>
            <p className="text-sm mb-3">
              <span className="block font-semibold text-white">Email:</span>
              contact@newspaper.vn
            </p>
            <p className="text-sm mb-4">
              <span className="block font-semibold text-white">Điện Thoại:</span>
              +84 (0) 123 456 789
            </p>
            <div>
              <p className="text-sm font-semibold text-white mb-2">Đăng ký nhận tin</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 text-sm rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300 font-semibold"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Tờ Báo Điện Tử. All rights reserved.</p>
          <p>Thiết kế bởi <span className="text-white font-semibold">Your Team</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
