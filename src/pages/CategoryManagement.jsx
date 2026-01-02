import React, { useState } from 'react'

const CategoryManagement = () => {
  const [activeTab, setActiveTab] = useState('categories')

  // Dữ liệu mẫu danh mục (bao gồm cả phân cấp)
  const categories = [
    {
      id: 1,
      name: 'Công nghệ',
      description: 'Tech news and reviews',
      slug: '/technology',
      count: '1,284',
      status: 'Active',
      icon: 'laptop_mac',
      iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      isParent: true
    },
    {
      id: 2,
      name: 'Artificial Intelligence',
      slug: '/technology/ai',
      count: '342',
      status: 'Active',
      isChild: true,
      parentId: 1
    },
    {
      id: 3,
      name: 'World News',
      description: 'Global events and politics',
      slug: '/world',
      count: '5,621',
      status: 'Active',
      icon: 'public',
      iconColor: 'bg-purple-100 text-purple-900/30 dark:bg-purple-900/30 dark:text-purple-400',
      isParent: true
    },
    {
      id: 4,
      name: 'Olympics 2024',
      description: 'Seasonal Event',
      slug: '/sports/olympics',
      count: '0',
      status: 'Hidden',
      icon: 'sports_basketball',
      iconColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      isParent: true
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Quản lý danh mục & thẻ</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">
            Quản lý cấu trúc phân loại tin tức và hệ thống gắn thẻ để tổ chức nội dung hiệu quả.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white dark:bg-card-dark hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-900 dark:text-white border border-gray-200 dark:border-gray-700 font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Xuất file</span>
          </button>
          <button className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Thêm mới</span>
          </button>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800 px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-4 px-2 transition-all focus:outline-none ${activeTab === 'categories' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <span className="text-sm font-bold tracking-wide">Danh mục (Categories)</span>
            </button>
            <button
              onClick={() => setActiveTab('tags')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-4 px-2 transition-all focus:outline-none ${activeTab === 'tags' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <span className="text-sm font-bold tracking-wide">Thẻ (Tags)</span>
            </button>
          </div>
        </div>

        {/* Filters & Toolbar */}
        <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-card-dark">
          <div className="relative w-full sm:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-background-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Tìm kiếm danh mục, slug..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Bộ lọc
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-lg">sort</span>
              Sắp xếp
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-transparent h-4 w-4" type="checkbox"/>
                </th>
                <th className="px-6 py-4">Tên danh mục</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Số bài viết</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm bg-white dark:bg-card-dark">
              {categories.map((cat) => (
                <tr key={cat.id} className={`group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${cat.status === 'Hidden' ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4 text-center">
                    <input className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-transparent h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" type="checkbox"/>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-3 ${cat.isChild ? 'pl-8 relative' : ''}`}>
                      {cat.isChild && (
                        <>
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-px bg-gray-300 dark:bg-gray-700"></div>
                          <div className="absolute left-3 bottom-1/2 w-px h-full bg-gray-300 dark:bg-gray-700 -top-5"></div>
                        </>
                      )}
                      {cat.icon && (
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${cat.iconColor}`}>
                          <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className={`font-bold text-slate-900 dark:text-white ${cat.isChild ? 'font-medium' : ''}`}>{cat.name}</span>
                        {cat.description && <span className="text-xs text-slate-500">{cat.description}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400 text-xs">{cat.slug}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-slate-800 dark:text-slate-300">
                      {cat.count}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      cat.status === 'Active'
                        ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 border-gray-200 dark:border-gray-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cat.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {cat.status === 'Active' ? 'Hoạt động' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-card-dark flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">Hiển thị <span className="font-medium text-slate-900 dark:text-white">1</span> đến <span className="font-medium text-slate-900 dark:text-white">4</span> trong số <span className="font-medium text-slate-900 dark:text-white">24</span> kết quả</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-slate-500 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-slate-500 hover:bg-white dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryManagement