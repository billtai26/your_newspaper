// 1. Import useState và AuthModal
import { useState } from 'react' // <--- THÊM DÒNG NÀY
import { Search, User, Menu, ChevronDown, CloudSun, Bell } from 'lucide-react'
import AuthModal from './AuthModal' // <--- IMPORT COMPONENT MỚI

const Header = () => {
  // 2. Khai báo state
  const [showModal, setShowModal] = useState(false) // <--- THÊM STATE

  const categories = ['Thời sự', 'Góc nhìn', 'Thế giới', 'Video', 'Podcasts', 'Kinh doanh', 'Bất động sản', 'Khoa học', 'Giải trí', 'Thể thao', 'Pháp luật', 'Giáo dục', 'Sức khỏe', 'Đời sống', 'Du lịch', 'Số hóa', 'Xe', 'Tâm sự', 'Hài']

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric'
  })

  return (
    <>
      {/* 3. Hiển thị Modal khi state = true */}
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
        <div className="container mx-auto px-4 h-[60px] flex items-center justify-between text-[14px] text-gray-600">

          {/* ... (Giữ nguyên PHẦN BÊN TRÁI) ... */}
          <div className="flex items-center h-full">
            <a href="/" className="flex flex-col justify-center mr-4 group">
              <img src="https://s4.vnecdn.net/vnexpress/restruct/i/v9739/v2_2019/pc/graphics/logo_tagline.svg" alt="VnExpress" className="h-12 w-auto object-contain mb-0.5" />
            </a>
            <div className="w-px h-8 bg-gray-200 mx-3"></div>
            <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
              <span className="font-medium text-gray-500">TP HCM</span>
              <ChevronDown size={14} className="text-gray-400" />
              <CloudSun size={18} className="text-gray-400 ml-2" />
              <span className="ml-1 text-gray-500">31°</span>
            </div>
            <div className="w-px h-8 bg-gray-200 mx-3"></div>
            <span className="text-gray-500 text-sm hidden lg:block">{today}</span>
          </div>

          {/* === PHẦN BÊN PHẢI === */}
          <div className="flex items-center gap-4 h-full">
            <a href="#" className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors whitespace-nowrap hidden md:block">
              Mới nhất
            </a>
            <a href="#" className="hover:text-vn-red transition-colors whitespace-nowrap hidden md:block">
              Tin theo khu vực
            </a>
            <div className="w-px h-4 bg-gray-200 hidden md:block"></div>
            <a href="#" className="items-center gap-1.5 hover:text-vn-red transition-colors hidden md:flex">
              <div className="w-4 h-4 border border-vn-red rounded-xs flex items-center justify-center">
                <span className="text-[10px] font-bold text-vn-red">E</span>
              </div>
              <span className="text-gray-500 hover:text-vn-red">International</span>
            </a>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-vn-red transition-colors">
              <Search size={18} />
            </button>

            {/* 4. Gắn sự kiện onClick vào nút Đăng nhập */}
            <button
              onClick={() => setShowModal(true)} // <--- SỬA DÒNG NÀY
              className="flex items-center gap-2 text-gray-500 hover:text-vn-red transition-colors"
            >
              <User size={20} className="stroke-[1.5]" />
              <span className="hidden sm:inline text-sm">Đăng nhập</span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-vn-red transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-vn-red rounded-full border border-white"></span>
            </button>
          </div>
        </div>

        {/* ... (Giữ nguyên Navigation Menu) ... */}
        <nav className="border-t border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-5 overflow-x-auto whitespace-nowrap py-3 no-scrollbar">
              <div className="p-1.5 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 shrink-0 transition-colors">
                <Menu size={18} className="text-gray-600" />
              </div>
              {categories.map((cat) => (
                <a key={cat} href="#" className="text-[14px] font-bold text-gray-700 hover:text-vn-red transition-colors font-sans">
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
