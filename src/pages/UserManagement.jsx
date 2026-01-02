import React from 'react'

const UserManagement = () => {
  // Dữ liệu mẫu dựa trên thiết kế của bạn
  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@example.com',
      role: 'Quản trị viên',
      joinDate: '12/10/2023',
      status: 'Hoạt động',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYa5d27-zHdufhu2aNWD6ZVX6hN47l-o5PtS9MAkTNQmKrDNfkhlSqlEor72h6CUPGWqBzWoT0FZUvhvXEc1M_tgb9luiVgUIJ-oLeuWr-C1P20UqMec0Z0IrvDrUlOMdDpPbzZ73_5Rvf_7yFjWdWMBvrKmxlQ2l8_m4m_xAgUGKOtJH0TAaRcov8fJ2Gvbq4M-pzVx-Ouqhm99EkDtTj537Sn3WZ3mIyH43nvndeZ-hZa_phVW2jdjZoooqsHOESkCX8NiGjSi4'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      email: 'binh.tran@example.com',
      role: 'Biên tập viên',
      joinDate: '05/11/2023',
      status: 'Hoạt động',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHJUnoofntZR01p-owkqAsy9ZhwFVh1Tn7qGXtuEtci44eMPj3FsCjMGC4biX1NeSKXYUPuGiWXgLt7Fe_wsbU4Gyc828P5XQWzkOmmipO5Qf4zeNgLqwj5NACEcXxQSjh86NK2XZuh85KiJ0Z6CocVjRYt2su8Sea_l2V3khRP18ZEXIi9ba017ImNb9jc7kp50xy0C4USrUWfP1M8HNgTRXgrcT4g_POhR8t9kJtnH5Ssb73q8Nz8bcNUQHRyz6Q8SvdYAdSkCs'
    },
    {
      id: 3,
      name: 'Lê Văn Cường',
      email: 'cuong.le@example.com',
      role: 'Độc giả',
      joinDate: '15/11/2023',
      status: 'Đã khóa',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVJJyrRvom5u0fzg_v6aHR_mTQj6Ftz1DPbjBICeFxeUgGsocvUewNG14EJrbpxo8AOvNhHB5TJ6aZDiRkLzcM0EGolHhO9hcYnvyCH24GWJdxoa2sUodtKbeIMigcKeki1fS57gr5MwqV4qVPXM110DiwYbzm_cPnTPIXLw4mCBDzAvBdoM23LOINy4PCPdzgMk2B-pwfKIYefETkAUgOfuOrx2Cl694CzXaI-2nXAp7hxExTj9TlUyfVBkNprB-XOQ2q3U8lVMI'
    },
    {
      id: 4,
      name: 'Phạm Minh',
      email: 'minh.pham@example.com',
      role: 'Độc giả',
      joinDate: '20/11/2023',
      status: 'Hoạt động',
      initials: 'PM' // Dùng khi không có ảnh
    }
  ]

  // Hàm hỗ trợ lấy màu cho Vai trò
  const getRoleStyles = (role) => {
    switch (role) {
    case 'Quản trị viên':
      return 'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30'
    case 'Biên tập viên':
      return 'bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30'
    default:
      return 'bg-slate-100 text-slate-600 ring-slate-500/10 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/20'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">Quản lý người dùng</h2>
            <p className="mt-2 text-base font-normal text-slate-500 dark:text-[#9da6b9]">Quản lý tài khoản, phân quyền và trạng thái hoạt động.</p>
          </div>
          <button className="group flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold tracking-wide text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-primary/30">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
            <span>Thêm người dùng</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng người dùng</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12,450</h3>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">+5.2%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Người dùng mới</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">+340</h3>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">+12.5%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tài khoản bị khóa</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">15</h3>
            <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-1.5 py-0.5 rounded">-2.0%</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 dark:border-[#3b4354] lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex w-full max-w-md items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 dark:text-[#9da6b9]" style={{ fontSize: '20px' }}>search</span>
            </div>
            <input
              className="h-10 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary dark:border-[#3b4354] dark:bg-[#282e39] dark:text-white dark:placeholder-[#9da6b9]"
              placeholder="Tìm kiếm theo tên, email..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none dark:border-[#3b4354] dark:bg-[#282e39] dark:text-white">
              <option value="">Tất cả vai trò</option>
              <option value="admin">Quản trị viên</option>
              <option value="editor">Biên tập viên</option>
              <option value="user">Độc giả</option>
            </select>
            <select className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none dark:border-[#3b4354] dark:bg-[#282e39] dark:text-white">
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="banned">Đã khóa</option>
            </select>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-[#3b4354] dark:bg-[#282e39] dark:text-white">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase font-semibold tracking-wider text-slate-500 dark:border-[#3b4354] dark:bg-[#1c222e] dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">Thành viên</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Ngày tham gia</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#3b4354]">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-[#1c222e]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <div
                          className="h-10 w-10 shrink-0 rounded-full bg-slate-200 bg-cover bg-center"
                          style={{ backgroundImage: `url("${user.avatar}")` }}
                        ></div>
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                          {user.initials}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</span>
                        <span className="text-xs text-slate-500 dark:text-[#9da6b9]">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getRoleStyles(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{user.joinDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${user.status === 'Hoạt động' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-[#3b4354] dark:hover:text-white">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-red-100 text-slate-400 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-[#3b4354] sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-400">
                Hiển thị <span className="font-medium text-slate-900 dark:text-white">1</span> đến <span className="font-medium text-slate-900 dark:text-white">5</span> trong số <span className="font-medium text-slate-900 dark:text-white">12,450</span> kết quả
              </p>
            </div>
            <div>
              <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:ring-[#3b4354] dark:hover:bg-[#282e39]">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
                </button>
                <button className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white">1</button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:text-white dark:ring-[#3b4354] dark:hover:bg-[#282e39]">2</button>
                <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:ring-[#3b4354] dark:hover:bg-[#282e39]">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagement