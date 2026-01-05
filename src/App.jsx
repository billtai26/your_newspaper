import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FeaturedNews from './components/FeaturedNews'
import RecentNews from './components/RecentNews'
import NewsList from './components/NewsList'
import ArticleDetail from './pages/ArticleDetail'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/AdminDashboard' // Import trang Admin vừa tạo
import PostManagement from './pages/PostManagement'
import UserManagement from './pages/UserManagement'
import CategoryManagement from './pages/CategoryManagement'
import CommentManagement from './pages/CommentManagement'
import Login from './pages/Login';
import Register from './pages/Register'

// Component Trang Chủ
const HomePage = () => (
  <main className="container mx-auto px-4 mt-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <FeaturedNews />
        <RecentNews />
      </div>
      <div className="md:col-span-1 pl-0 md:pl-6 md:border-l border-gray-200">
        <div className="bg-gray-100 p-4 rounded mb-6 text-center text-gray-500 text-sm min-h-[200px] flex items-center justify-center">
            Khu vực Quảng Cáo
        </div>
        <NewsList />
      </div>
    </div>
  </main>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route dành riêng cho Admin: Không hiển thị Header và Footer của trang tin tức */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* Trang mặc định khi vào /admin */}
          <Route path="bai-viet" element={<PostManagement />} />
          <Route path="nguoi-dung" element={<UserManagement />} />
          <Route path="danh-muc" element={<CategoryManagement />} />
          <Route path="binh-luan" element={<CommentManagement />} />
        </Route>

        {/* Tất cả các Route khác sẽ được bọc trong giao diện chung (Header/Footer) */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen bg-[#fcfcfc]">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/article/:id" element={<ArticleDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* Bạn có thể thêm các route khác của trang người dùng ở đây */}
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App