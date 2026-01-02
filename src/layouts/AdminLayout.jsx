import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const AdminLayout = () => {
  const location = useLocation()

  // Hàm kiểm tra xem link có đang active không để đổi màu
  const isActive = (path) => location.pathname === path

  const menuItems = [
    { name: 'Tổng quan', path: '/admin', icon: 'dashboard' },
    { name: 'Bài viết', path: '/admin/bai-viet', icon: 'article' },
    { name: 'Danh mục', path: '/admin/danh-muc', icon: 'category' },
    { name: 'Người dùng', path: '/admin/nguoi-dung', icon: 'group' },
    { name: 'Bình luận', path: '/admin/binh-luan', icon: 'chat_bubble' }
  ]

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen">
      <div className="flex h-screen w-full overflow-hidden">
        {/* SIDEBAR DÙNG CHUNG */}
        <aside className="w-64 flex flex-col bg-card-light dark:bg-card-dark border-r border-border-light dark:border-border-dark md:flex shrink-0">
          <div className="p-6 flex items-center gap-3">
            <div className="bg-primary aspect-square rounded-full size-10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">newsmode</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-normal">NewsAdmin</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">Quản trị viên</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 px-4 py-4 overflow-y-auto flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border-light dark:border-border-dark">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Đăng xuất</span>
            </Link>
          </div>
        </aside>

        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* HEADER DÙNG CHUNG */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shrink-0 z-20">
            <div className="flex items-center gap-4">
              <button className="md:hidden text-slate-500 hover:text-primary">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h2 className="text-lg font-bold">Bảng điều khiển</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center h-10 bg-slate-100 dark:bg-[#282e39] rounded-lg px-3 w-64">
                <span className="material-symbols-outlined text-slate-400">search</span>
                <input type="text" className="bg-transparent border-none text-sm w-full ml-2 focus:ring-0" placeholder="Tìm kiếm..." />
              </div>
              <div
                className="size-9 rounded-full bg-cover bg-center border-2 border-slate-200 dark:border-[#3b4354]"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtbM4tRrGKsMnLIBxDrgzoJuJ9iLI66K0HrzjScIr242ukv0SvrNH_bZGLIdbSpDynF0qBgx2g3DC9MVwKmBKMEB5EvXeacHypZU-55YnPL4_h5CSrBuWuQ-aWtB_UWEkUEq5umPVm0tS-qR_IBham4fyGLcemTtvOhsv-E_kuWMHYrEaw0bKAVijqIW2n-bHg-9fEZXkelasj7fsMogG0wSLGPf_rOi0Wotc80XTohyzQdGcFkHMjA7Vk9R8LD57V03lCuTKfCNA")' }}
              ></div>
            </div>
          </header>

          {/* NỘI DUNG THAY ĐỔI THEO TRANG */}
          <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="max-w-[1400px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout