import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FeaturedNews from './components/FeaturedNews'
import RecentNews from './components/RecentNews'
import NewsList from './components/NewsList'
import ArticleDetail from './pages/ArticleDetail' // Import trang vừa tạo

// Component Trang Chủ (Gom code cũ vào đây)
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
      <div className="flex flex-col min-h-screen bg-[#fcfcfc]">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tin-tuc/:id" element={<ArticleDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
