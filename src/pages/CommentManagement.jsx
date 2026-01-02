import React from 'react'

const CommentManagement = () => {
  // Dữ liệu mẫu bình luận
  const comments = [
    {
      id: 1,
      user: 'Nguyễn Văn An',
      userImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYa5d27-zHdufhu2aNWD6ZVX6hN47l-o5PtS9MAkTNQmKrDNfkhlSqlEor72h6CUPGWqBzWoT0FZUvhvXEc1M_tgb9luiVgUIJ-oLeuWr-C1P20UqMec0Z0IrvDrUlOMdDpPbzZ73_5Rvf_7yFjWdWMBvrKmxlQ2l8_m4m_xAgUGKOtJH0TAaRcov8fJ2Gvbq4M-pzVx-Ouqhm99EkDtTj537Sn3WZ3mIyH43nvndeZ-hZa_phVW2jdjZoooqsHOESkCX8NiGjSi4',
      content: 'Bài viết rất hay và bổ ích, cảm ơn tác giả đã chia sẻ thông tin về công nghệ AI mới nhất!',
      post: 'Xu hướng công nghệ AI năm 2024...',
      date: '12/10/2023',
      status: 'Đã duyệt'
    },
    {
      id: 2,
      user: 'Trần Thị Bình',
      userImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHJUnoofntZR01p-owkqAsy9ZhwFVh1Tn7qGXtuEtci44eMPj3FsCjMGC4biX1NeSKXYUPuGiWXgLt7Fe_wsbU4Gyc828P5XQWzkOmmipO5Qf4zeNgLqwj5NACEcXxQSjh86NK2XZuh85KiJ0Z6CocVjRYt2su8Sea_l2V3khRP18ZEXIi9ba017ImNb9jc7kp50xy0C4USrUWfP1M8HNgTRXgrcT4g_POhR8t9kJtnH5Ssb73q8Nz8bcNUQHRyz6Q8SvdYAdSkCs',
      content: 'Tôi có thắc mắc về phần khởi nghiệp, liệu vốn ít có thể thực hiện theo cách này không?',
      post: 'Bí quyết khởi nghiệp thành công...',
      date: '11/10/2023',
      status: 'Chờ duyệt'
    },
    {
      id: 3,
      user: 'Lê Văn Cường',
      userImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVJJyrRvom5u0fzg_v6aHR_mTQj6Ftz1DPbjBICeFxeUgGsocvUewNG14EJrbpxo8AOvNhHB5TJ6aZDiRkLzcM0EGolHhO9hcYnvyCH24GWJdxoa2sUodtKbeIMigcKeki1fS57gr5MwqV4qVPXM110DiwYbzm_cPnTPIXLw4mCBDzAvBdoM23LOINy4PCPdzgMk2B-pwfKIYefETkAUgOfuOrx2Cl694CzXaI-2nXAp7hxExTj9TlUyfVBkNprB-XOQ2q3U8lVMI',
      content: 'Nội dung này vi phạm chính sách cộng đồng, yêu cầu gỡ bỏ ngay lập tức!',
      post: 'Triển lãm nghệ thuật đương đại...',
      date: '10/10/2023',
      status: 'Vi phạm'
    },
    {
      id: 4,
      user: 'Phạm Minh',
      userImg: '',
      initials: 'PM',
      content: 'Link này có chứa virus, mọi người cẩn thận đừng bấm vào nhé: bit.ly/spam-link',
      post: 'Đánh giá iPhone 15 Pro Max',
      date: '09/10/2023',
      status: 'Spam'
    }
  ]

  // Hàm hỗ trợ lấy màu cho Trạng thái bình luận theo phong cách Stitch
  const getStatusStyles = (status) => {
    switch (status) {
    case 'Đã duyệt':
      return 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
    case 'Chờ duyệt':
      return 'bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
    case 'Vi phạm':
      return 'bg-orange-100/50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800'
    case 'Spam':
      return 'bg-red-100/50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
    default:
      return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
    }
  }

  const getStatusDot = (status) => {
    switch (status) {
    case 'Đã duyệt': return 'bg-emerald-500'
    case 'Chờ duyệt': return 'bg-yellow-500'
    case 'Vi phạm': return 'bg-orange-500'
    case 'Spam': return 'bg-red-500'
    default: return 'bg-slate-400'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section with Breadcrumbs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <a className="font-medium text-slate-500 hover:text-primary dark:text-[#9da6b9]" href="/admin">Trang chủ</a>
          <span className="text-slate-400 dark:text-[#9da6b9]">/</span>
          <span className="font-medium text-slate-900 dark:text-white">Bình luận</span>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">Quản lý bình luận</h2>
            <p className="mt-2 text-base font-normal text-slate-500 dark:text-[#9da6b9]">Duyệt, phản hồi hoặc xử lý các bình luận từ độc giả.</p>
          </div>
          <button className="group flex h-10 items-center justify-center gap-2 rounded-lg bg-white dark:bg-[#282e39] border border-slate-200 dark:border-[#3b4354] px-5 text-sm font-bold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-[#3b4354]">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Stats Section with Trends */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng bình luận</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">5,240</h3>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">+12%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Đang chờ duyệt</p>
          <h3 className="text-2xl font-bold text-yellow-500">12</h3>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Vi phạm/Spam</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-red-500">45</h3>
            <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded">+2%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tỉ lệ phản hồi</p>
          <h3 className="text-2xl font-bold text-emerald-500">92%</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm dark:border-[#3b4354] dark:bg-[#111318]">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 dark:border-[#3b4354] lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex w-full max-w-md items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 dark:text-[#9da6b9]" style={{ fontSize: '20px' }}>search</span>
            </div>
            <input
              className="h-10 w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary dark:border-[#3b4354] dark:bg-[#282e39] dark:text-white dark:placeholder-[#9da6b9]"
              placeholder="Tìm nội dung, tên người dùng..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none dark:border-[#3b4354] dark:bg-[#282e39] dark:text-white">
              <option value="">Trạng thái: Tất cả</option>
              <option value="approved">Đã duyệt</option>
              <option value="pending">Chờ duyệt</option>
              <option value="reported">Vi phạm</option>
              <option value="spam">Spam</option>
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
                <th className="px-6 py-4 w-4">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" />
                </th>
                <th className="px-6 py-4">Người dùng</th>
                <th className="px-6 py-4 min-w-[320px]">Nội dung bình luận</th>
                <th className="px-6 py-4">Bài viết</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#3b4354]">
              {comments.map((comment) => (
                <tr key={comment.id} className="group hover:bg-slate-50 dark:hover:bg-[#1c222e]/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {comment.userImg ? (
                        <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url("${comment.userImg}")` }}></div>
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                          {comment.initials}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{comment.user}</span>
                        <span className="text-[11px] text-slate-500 dark:text-[#9da6b9]">{comment.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{comment.content}"</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-primary hover:underline cursor-pointer line-clamp-1">{comment.post}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${getStatusStyles(comment.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(comment.status)}`}></span>
                      {comment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {comment.status === 'Chờ duyệt' && (
                        <button title="Duyệt" className="flex h-8 w-8 items-center justify-center rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
                        </button>
                      )}
                      <button title="Phản hồi" className="flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-[#3b4354]">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>reply</span>
                      </button>
                      <button title="Xóa" className="flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-[#3b4354] sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700 dark:text-slate-400">
              Hiển thị <span className="font-medium text-slate-900 dark:text-white">1</span> đến <span className="font-medium text-slate-900 dark:text-white">4</span> trong số <span className="font-medium text-slate-900 dark:text-white">5,240</span> kết quả
            </p>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
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
  )
}

export default CommentManagement