const Banner = () => {
  return (
    <div className="bg-green-500 w-full py-6 mb-6 relative overflow-hidden text-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="z-10">
          <h2 className="text-3xl font-bold uppercase italic">Freeship lẹ làng</h2>
          <h1 className="text-5xl font-extrabold text-yellow-300 uppercase drop-shadow-md">CHĂM CẢ NHÀ AN!</h1>
          <button className="mt-4 bg-yellow-400 text-green-800 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition">
              TẢI NGAY APP
          </button>
        </div>
        {/* Giả lập hình ảnh hoạt họa */}
        <div className="hidden md:block opacity-90">
          <div className="w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
