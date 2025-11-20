import { Search, User, LayoutGrid, Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* Giả lập Logo */}
          <h1 className="text-2xl font-bold text-orange-500">BÁOMỚI</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập nội dung tìm kiếm"
              className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded border border-transparent focus:bg-white focus:border-gray-300 outline-none transition"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-500">
          <User className="w-6 h-6 cursor-pointer hover:text-blue-600" />
          <LayoutGrid className="w-6 h-6 cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      {/* Navigation Bar (Màu xanh Teal) */}
      <div className="bg-[#2fa4ba] text-white text-sm font-medium">
        <div className="container mx-auto px-4 h-10 flex items-center overflow-x-auto whitespace-nowrap gap-6">
          <span className="cursor-pointer hover:text-gray-200">NÓNG</span>
          <span className="cursor-pointer hover:text-gray-200">MỚI</span>
          <span className="cursor-pointer hover:text-gray-200">VIDEO</span>
          <span className="cursor-pointer hover:text-gray-200">CHỦ ĐỀ</span>
          <div className="w-px h-4 bg-white/30 mx-2"></div>
          <span className="px-3 py-0.5 bg-white/20 rounded-full text-xs"># Đại hội Đảng XIV</span>
          <span className="px-3 py-0.5 bg-white/20 rounded-full text-xs"># Nghị quyết 57</span>
        </div>
      </div>
    </header>
  )
}

export default Header
