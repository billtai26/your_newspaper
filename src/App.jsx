import Header from './components/Header'
import FeaturedNews from './components/FeaturedNews'
import RecentNews from './components/RecentNews' // Import component mới
import NewsList from './components/NewsList' // Cái này giờ sẽ đóng vai trò là Sidebar bên phải

function App() {
  return (
    <div className="min-h-screen pb-10 bg-[#fcfcfc]">
      <Header />

      <main className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* === CỘT TRÁI (Chiếm 2 phần) === */}
          <div className="md:col-span-2">
            {/* 1. Phần Tin Nổi Bật (Trên cùng) */}
            <FeaturedNews />

            {/* 2. Phần Tin Vừa Cập Nhật (Sẽ lấp đầy khoảng trắng bên dưới) */}
            <RecentNews />
          </div>

          {/* === CỘT PHẢI (Chiếm 1 phần - Sidebar) === */}
          <div className="md:col-span-1 pl-0 md:pl-6 md:border-l border-gray-200">
            {/* Sidebar có thể chứa quảng cáo, tin đọc nhiều, tỷ giá... */}
            <div className="bg-gray-100 p-4 rounded mb-6 text-center text-gray-500 text-sm min-h-[200px] flex items-center justify-center">
                Khu vực Quảng Cáo
            </div>
            <NewsList />
          </div>

        </div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 VnExpress. All rights reserved.</p>
          <p className="mt-2">Báo tiếng Việt nhiều người xem nhất.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
