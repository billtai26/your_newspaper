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
import ActivateAccount from './pages/ActivateAccount'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'

// Component Trang Chủ
const HomePage = () => (
  <main className="container mx-auto px-4 mt-6">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Cột chính: 3/4 độ rộng trên màn hình lớn */}
      <div className="lg:col-span-3 space-y-10">
        <section>
          <h2 className="text-vn-red border-l-4 border-vn-red pl-3 font-bold text-xl mb-4">TIN NỔI BẬT</h2>
          <FeaturedNews />
        </section>

        <section>
          <h2 className="text-gray-800 border-l-4 border-gray-800 pl-3 font-bold text-xl mb-4">TIN MỚI NHẤT</h2>
          <RecentNews />
        </section>
      </div>

      {/* Sidebar: 1/4 độ rộng */}
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-gray-50 p-4 border border-gray-100 rounded-lg sticky top-24">
          <div className="bg-gray-200 h-64 rounded flex items-center justify-center text-gray-400 mb-6">
            Quảng Cáo
          </div>
          <h3 className="font-bold text-lg mb-4 border-b pb-2">ĐỌC NHIỀU</h3>
          <NewsList />
        </div>
      </div>
    </div>
  </main>
)

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
                  <Route path="/activate/:token" element={<ActivateAccount />} />
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