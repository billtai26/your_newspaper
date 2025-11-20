import Header from './components/Header'
import Banner from './components/Banner'
import FeaturedNews from './components/FeaturedNews'
import NewsList from './components/NewsList'

function App() {
  return (
    <div className="min-h-screen pb-10">
      <Header />

      <Banner />

      <main className="container mx-auto px-4">
        {/* Layout Grid: Mobile 1 cột, Desktop 3 cột (2 phần chính - 1 phần phụ) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cột bên trái: Tin nổi bật (chiếm 2 cột ở desktop) */}
          <div className="md:col-span-2">
            <FeaturedNews />
          </div>

          {/* Cột bên phải: Danh sách tin (chiếm 1 cột) */}
          <div className="md:col-span-1">
            <NewsList />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
