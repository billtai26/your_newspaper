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
    {/* Phần tin nổi bật 1 to 4 */}
    <FeaturedNews />

    {/* Phần tin tức còn lại hiển thị ngang, full màn hình */}
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-6 pb-2 border-b-2 border-vn-red inline-block">
        TIN TỨC KHÁC
      </h2>
      <NewsList />
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