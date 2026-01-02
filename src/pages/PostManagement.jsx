import React from 'react'

const PostManagement = () => {
  // Dữ liệu mẫu để hiển thị bảng đầy đủ hơn
  const posts = [
    {
      id: 1,
      title: 'Xu hướng công nghệ AI năm 2024: Những điều cần biết',
      views: '1.2k',
      comments: 45,
      author: 'Nguyễn Văn A',
      authorImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8lMymlqU4MI__NL-G4d6AxhRu5cvN6Gwctknz0TBJWT-WgPqIFnpvCrnDyQ7StK39bx44jbtka9jbUdxRqgDhQgOC89MC0Um9OE8PY8vq2825F4TAoKs53M_LHDVrjTtzedtXTJoWTZgEhNJ6UebD1FGDerEZGzBMRJ5sau2sLDj__9og6uhXBpKKgCAWreuER5FEha8znRgy94vKkI_wAlZJfkysIAdV2MhRUsO6y-znoAVfPoiPY4vbRCX8Pik4nMmOKSvU5VI',
      category: 'Công nghệ',
      status: 'Đã xuất bản',
      date: '12/10/2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm2VuTmu8DnJ9LKLA_DwkOHpP-gQHP67dZJCwRWM5F_Ur5fG6uHmzEG6ZuE3nwXuX8QYgy9NL1aclNTpgECd5Gsm94sk-fmgKP69LQXMUpOaH6Y-RVrqbzPaGYz_Zx0aydetUgYXlQlBgCCFFHjC67x0o_50Rpew5KiNyAXs_3yR6EWp1puPRg_7uPuxyqawESvPk-dgs6wN33vA8OTG1HfwRk0k4hN9pXnjfQwFqnKWhaU7_G09B8q9GDtxKTynqZXiFKxzspoKo'
    },
    {
      id: 2,
      title: 'Bí quyết khởi nghiệp thành công từ con số 0',
      views: '0',
      comments: 0,
      author: 'Trần Thị B',
      authorImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1D__lrCwiR-2LdH7nfG7xxCMTlMMpDN3VyULGJtUoU-ee3TXPzwCvIjMM14uaNZsVyw9w2B3Dp_QEglpVpWBJHu-T87cGbR-bjEeRY99Ddvg5IvTPjqR_r7szLdEcS5d6TkcKv-Sc9MXZ1AkmKzn2YUbLuRj9vr9APuiJtNjKt8XlRPgHWkQsHj-qExI2SssGNVQSfNn3Tqd1tSwYn17hjrkCoKatlI_1SDMOXBOzAfqOumbdr7utrndUhw6TG8i_HMbDy3bFVAk',
      category: 'Kinh doanh',
      status: 'Bản nháp',
      date: '10/10/2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ_-JWyZEa9-ERS5j7tREABjwf52Pn_jiZugd-LRfru2id1DFncsh87wqTb0_6NMz2poPbMlFAuq-dWu0m66Gjdy2Zx1KYri-JxrSg1NpQ9Qh4SBNcZlkNqUcqmlZ2i0JV4ImRcj2LpekR_gfHYSKn-xEkTAgyJPDOQq3CzMBdcGautsWK78X83J76UUKE8tS1hufRLQ6vIfDywG4T6ji20ClngGytOvatSLQUXlBl6Iyx1EB90Ft59Pc16O4n81c2y0xjzfc-zhE'
    },
    {
      id: 3,
      title: 'Triển lãm nghệ thuật đương đại tại Hà Nội',
      views: '0',
      comments: 0,
      author: 'Lê Văn C',
      authorImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG31c3jGhL1MsZ7CCpC-3s78PDYL1JrcpEXmdLxR5LRhEhIMNjzp_B_oJMgRZZ9nnZiW-0eeOkfgcOiR6FxVUg_yYeXhS18wHWRDyUbyJfea8p7Qer35BIQWoEV1jrqxEEf2HGxPeN5MypEOL9ZoFIqzp8TBHLyPFVwGkwr09lpM3FaDcRi5Ux2KVHvHH3aEFLBKXWiJxivU_XZjNQLXKm1oJdkIV4mAHTRk_-w44kj5NwvsetzfE8sLptHwh-uyniy0gnaRjJy60',
      category: 'Văn hóa',
      status: 'Chờ duyệt',
      date: '09/10/2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpuE3GZ2oDzu0yIFEFM4eaC5--O4kwCxHEVon9Pn12fnfDfKMesAdOMRep66rTF1ShxsmM3GJgzvMLRC2_1qazxLkNhoPS0wwTXLALDVOtQOnJ0A5YIGGMX3__NZcqkH3FrCphzyub2o_Zs6lDNd_B9nGm2c8AnVRbZYbCxVQW3PTIAeiMq248kmeD5K8W1lZqiBW6d9ap6pfhiKR-MFHlmuApcRVQqtmWlLhj0IVUHx7SzZBXypcx2vU8UpyZBOYC4LclnIkX4iw'
    }
  ]

  // Hàm hỗ trợ lấy màu cho Danh mục
  const getCategoryStyles = (category) => {
    switch (category) {
    case 'Công nghệ':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case 'Kinh doanh':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    case 'Văn hóa':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
    }
  }

  // Hàm hỗ trợ lấy màu cho Trạng thái
  const getStatusStyles = (status) => {
    switch (status) {
    case 'Đã xuất bản':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
    case 'Bản nháp':
      return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
    case 'Chờ duyệt':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Quản lý bài viết</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Danh sách tất cả tin tức, bài phóng sự trên hệ thống</p>
        </div>
        <button className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-primary hover:bg-blue-600 text-white font-semibold transition-all shadow-lg shadow-blue-500/20 gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Viết bài mới</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-light dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng bài viết</p>
            <span className="material-symbols-outlined text-primary">article</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">2,543</p>
          <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% so với tháng trước
          </p>
        </div>
        <div className="bg-surface-light dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Đã xuất bản</p>
            <span className="material-symbols-outlined text-green-500">check_circle</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">2,100</p>
        </div>
        <div className="bg-surface-light dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Chờ duyệt</p>
            <span className="material-symbols-outlined text-yellow-500">hourglass_top</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">15</p>
        </div>
        <div className="bg-surface-light dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Bản nháp</p>
            <span className="material-symbols-outlined text-slate-400">edit_note</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">428</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col xl:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto flex-1">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-[#111318] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
              placeholder="Tìm kiếm bài viết..."
              type="text"
            />
          </div>

          <div className="w-full md:w-60">
            <select className="block w-full pl-3 pr-10 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111318] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg transition-colors">
              <option>Tất cả danh mục</option>
              <option>Công nghệ</option>
              <option>Đời sống</option>
              <option>Thể thao</option>
            </select>
          </div>

          <div className="w-full md:w-60">
            <select className="block w-full pl-3 pr-10 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111318] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg transition-colors">
              <option>Trạng thái: Tất cả</option>
              <option>Đã xuất bản</option>
              <option>Bản nháp</option>
              <option>Chờ duyệt</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button className="p-2 text-primary bg-primary/10 rounded-lg transition-colors">
            <span className="material-symbols-outlined">view_list</span>
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </div>

      {/* Table Section - Đồng bộ hoàn toàn UI bảng của Stitch */}
      <div className="bg-surface-light dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-[#151a25]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-4">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bài viết</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tác giả</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Danh mục</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trạng thái</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày cập nhật</th>
                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-card-dark">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-[#1e2532]/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
                        <img src={post.img} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4 max-w-xs">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">{post.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{post.views} lượt xem • {post.comments} bình luận</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 bg-center bg-cover mr-2" style={{ backgroundImage: `url('${post.authorImg}')` }}></div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{post.author}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryStyles(post.category)}`}>
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{post.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section - Thanh phân trang đồng bộ của Stitch */}
        <div className="bg-white dark:bg-[#111318] px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">2</span> trong số <span className="font-medium">50</span> kết quả
              </p>
            </div>
            <div>
              <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111318] text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                <button className="bg-white dark:bg-[#111318] border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111318] text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostManagement