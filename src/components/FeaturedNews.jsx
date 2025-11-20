// src/components/FeaturedNews.jsx
const FeaturedNews = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1444653614773-995cb1ef902a?q=80&w=1000&auto=format&fit=crop"
          alt="Tin chính"
          className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600">
          Tổng Bí thư Tô Lâm thăm, làm việc tại đặc khu Thổ Châu
        </h2>
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-3">
          <img src="https://via.placeholder.com/20" className="w-5 h-5 rounded-full" alt="logo báo" />
          <span className="font-semibold text-gray-500">PHÁP LUẬT</span>
          <span>•</span>
          <span>15 liên quan</span>
        </div>
      </div>
    </div>
  )
}

export default FeaturedNews
