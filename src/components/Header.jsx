import { useState, useRef, useEffect } from 'react'
import { Search, User, Menu, ChevronDown, CloudSun, Bell, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import categoryApi from '../api/categoryApi' // Import API vừa tạo
import { toast } from 'react-toastify'

const Header = () => {
  const navRef = useRef(null)
  // SỬA LỖI LINTER: Đổi thành _location để linter bỏ qua vì biến này chỉ dùng để kích hoạt render lại
  const _location = useLocation()
  const navigate = useNavigate()

  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  // 1. Chuyển categories thành state
  const [categories, setCategories] = useState([])

  // 2. Gọi API lấy danh mục khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll()

        // Axios trả về body của response trong thuộc tính .data
        // Body hiện tại là { data: [...], total: X }
        const result = response.data || response

        // Kiểm tra nếu result.data là mảng (cấu trúc mới)
        if (result && Array.isArray(result.data)) {
          setCategories(result.data)
        }
        // Nếu result trực tiếp là mảng (cấu trúc cũ)
        else if (Array.isArray(result)) {
          setCategories(result)
        } else {
          setCategories([])
        }
      } catch (error) {
        // Tránh in lỗi ra console nếu không cần thiết, hoặc xử lý êm đẹp
        toast.error('Lỗi lấy danh mục:', error)
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  // Đọc thông tin từ localStorage
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  const username = localStorage.getItem('username')

  const isLoggedIn = !!token

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    navigate('/')
  }

  // Logic cuộn danh mục (Giữ nguyên)
  const handleScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  const scroll = (direction) => {
    if (navRef.current) {
      const scrollAmount = 200
      navRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const node = navRef.current
    if (node) {
      node.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => node.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // const categories = ['Thời sự', 'Góc nhìn', 'Thế giới', 'Video', 'Podcasts', 'Kinh doanh', 'Bất động sản', 'Khoa học', 'Giải trí', 'Thể thao', 'Pháp luật', 'Giáo dục', 'Sức khỏe', 'Đời sống', 'Du lịch', 'Số hóa', 'Xe', 'Tâm sự', 'Hài']

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 h-[60px] flex items-center justify-between text-[14px] text-gray-600">
        <div className="flex items-center h-full">
          <Link to="/" className="flex flex-col justify-center mr-4 group">
            <img src="https://s4.vnecdn.net/vnexpress/restruct/i/v9739/v2_2019/pc/graphics/logo_tagline.svg" alt="VnExpress" className="h-12 w-auto object-contain mb-0.5" />
          </Link>
          <div className="w-px h-8 bg-gray-200 mx-3"></div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
            <span className="font-medium text-gray-500">TP HCM</span>
            <ChevronDown size={14} className="text-gray-400" />
            <CloudSun size={18} className="text-gray-400 ml-2" />
            <span className="ml-1 text-gray-500">31°</span>
          </div>
        </div>

        <div className="flex items-center gap-4 h-full">
          <a href="#" className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors whitespace-nowrap hidden md:block">Mới nhất</a>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {userRole === 'admin' && (
                <Link to="/admin" className="text-vn-red font-bold hover:underline">Quản trị</Link>
              )}

              <div className="flex items-center gap-2 text-gray-700">
                {/* Vì không có avatar trong DB, hiển thị vòng tròn tên viết tắt */}
                <div className="w-8 h-8 rounded-full bg-vn-red flex items-center justify-center text-white font-bold uppercase shadow-sm">
                  {username ? username.charAt(0) : 'U'}
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {username || 'Người dùng'}
                </span>
              </div>

              <button onClick={handleLogout} className="flex items-center gap-1 text-gray-500 hover:text-vn-red transition-colors">
                <LogOut size={18} />
                <span className="hidden sm:inline">Thoát</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-gray-500 hover:text-vn-red transition-colors">
              <User size={20} className="stroke-[1.5]" />
              <span className="hidden sm:inline text-sm">Đăng nhập</span>
            </Link>
          )}

          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-vn-red transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-vn-red rounded-full border border-white"></span>
          </button>
        </div>
      </div>

      {/* --- PHẦN DANH MỤC (Giữ nguyên) --- */}
      <nav className="border-t border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] relative group/nav">
        <div className="container mx-auto px-4 relative flex items-center">
          {showLeftArrow && (
            <button onClick={() => scroll('left')} className="absolute left-0 z-10 h-full px-2 bg-white/90 backdrop-blur-sm flex items-center text-gray-400 hover:text-vn-red">
              <ChevronLeft size={24} />
            </button>
          )}
          <div ref={navRef} className="flex items-center gap-5 overflow-x-auto whitespace-nowrap py-3 no-scrollbar scroll-smooth">
            <div className="p-1.5 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 shrink-0">
              <Menu size={18} className="text-gray-600" />
            </div>
            {/* 3. Duyệt mảng categories từ API */}
            {categories.map((cat) => (
              <a
                key={cat._id}
                href={`/category/${cat._id}`}
                className="text-[14px] font-bold text-gray-700 hover:text-vn-red transition-colors"
              >
                {cat.Name} {/* Hiển thị tên danh mục từ DB */}
              </a>
            ))}
          </div>
          {showRightArrow && (
            <button onClick={() => scroll('right')} className="absolute right-0 z-10 h-full px-2 bg-white/90 backdrop-blur-sm flex items-center text-gray-400 hover:text-vn-red">
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header