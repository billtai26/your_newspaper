import React from 'react'

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 dark:bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tổng lượt xem</p>
          <h3 className="text-2xl font-bold mt-1">1.2M</h3>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
              <span className="material-symbols-outlined">article</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 5%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Bài viết xuất bản</p>
          <h3 className="text-2xl font-bold mt-1">450</h3>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-400">
              <span className="material-symbols-outlined">group_add</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 8%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Người dùng mới</p>
          <h3 className="text-2xl font-bold mt-1">3,200</h3>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-pink-50 dark:bg-pink-500/10 rounded-lg text-pink-600 dark:text-pink-400">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <span className="text-rose-500 text-xs font-bold bg-rose-500/10 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_down</span> 2%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Bình luận mới</p>
          <h3 className="text-2xl font-bold mt-1">156</h3>
        </div>
      </div>

      {/* Main Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold">Xu hướng truy cập</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">30 ngày qua</p>
            </div>
            <select className="bg-slate-100 dark:bg-[#282e39] border-none text-xs rounded-lg px-3 py-2 text-slate-700 dark:text-white">
              <option>30 ngày</option>
              <option>7 ngày</option>
              <option>24 giờ</option>
            </select>
          </div>
          <div className="relative w-full h-[300px] mt-auto">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#135bec" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#135bec" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <line className="text-slate-200 dark:text-slate-700" stroke="currentColor" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="250" y2="250"></line>
              <line className="text-slate-200 dark:text-slate-700" stroke="currentColor" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="175" y2="175"></line>
              <line className="text-slate-200 dark:text-slate-700" stroke="currentColor" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
              <path d="M0,250 C50,230 100,180 150,200 C200,220 250,150 300,140 C350,130 400,180 450,160 C500,140 550,80 600,90 C650,100 700,140 750,120 L800,100 L800,300 L0,300 Z" fill="url(#chartGradient)"></path>
              <path d="M0,250 C50,230 100,180 150,200 C200,220 250,150 300,140 C350,130 400,180 450,160 C500,140 550,80 600,90 C650,100 700,140 750,120 L800,100" fill="none" stroke="#135bec" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm flex-1">
            <h3 className="text-lg font-bold mb-1">Nguồn truy cập</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Phân bổ lượt xem</p>
            <div className="flex items-center gap-4">
              <div className="relative size-32 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-200 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                  <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="40, 100" strokeWidth="4"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xs text-slate-400">Direct</span>
                  <span className="text-lg font-bold">40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        <div className="rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <h3 className="text-lg font-bold">Hoạt động gần đây</h3>
            <button className="text-primary text-sm font-medium">Xem tất cả</button>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-4 p-4 border-b border-border-light dark:border-border-dark">
              <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div>
                <p className="text-sm font-medium"><span className="font-bold">Nguyễn Văn A</span> đã chỉnh sửa bài viết</p>
                <span className="text-xs text-slate-400">2 phút trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard