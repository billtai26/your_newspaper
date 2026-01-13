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
import CategoryPage from './pages/CategoryPage'
import Login from './pages/Login'
import Register from './pages/Register'
import { toast, ToastContainer } from 'react-toastify'
import { useState, useEffect } from 'react'
import axiosClient from './api/axiosClient'

// Component Trang Chủ
const HomePage = () => {
  const [newsData, setNewsData] = useState({ featured: [], remaining: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllHomeNews = async () => {
      try {
        const response = await axiosClient.get('/admin/news/news-list?limit=15')
        const allNews = response.data.data

        if (allNews && allNews.length > 0) {
          setNewsData({
            featured: allNews.slice(0, 5), // 5 tin đầu cho FeaturedNews
            remaining: allNews.slice(5) // Các tin còn lại cho NewsList
          })
        }
      } catch (error) {
        toast.error('Lỗi trang chủ:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllHomeNews()
  }, [])

  if (loading) return <div className="text-center p-10">Đang tải tin tức...</div>

  return (
    <main className="container mx-auto px-4 mt-6">
      {/* Truyền dữ liệu trực tiếp xuống, không để con tự fetch nữa */}
      <FeaturedNews data={newsData.featured} />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6 pb-2 border-b-2 border-vn-red inline-block uppercase">
          TIN TỨC KHÁC
        </h2>
        {/* Truyền mảng tin còn lại xuống NewsList */}
        <NewsList data={newsData.remaining} />
      </div>
    </main>
  )
}

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
                  <Route path="/category/:id" element={<CategoryPage />} />
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