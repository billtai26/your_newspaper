import React, { useState, useEffect, useCallback } from 'react'
import categoryApi from '../api/categoryApi' // Import API
import { toast } from 'react-toastify'

const CategoryManagement = () => {
  const [activeTab, setActiveTab] = useState('categories')
  const [categories, setCategories] = useState([]) // State lưu danh mục thật
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ Name: '', ParentId: '', Status: 'Active' })
  const [submitting, setSubmitting] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({ Id: '', Name: '', ParentId: '' })
  const [updating, setUpdating] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [total, setTotal] = useState(0) // Tổng số bản ghi từ BE
  const [page, setPage] = useState(1) // Trang hiện tại
  const [size] = useState(10) // Số bản ghi mỗi trang

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.Name.trim()) {
      return toast.error('Tên danh mục không được để trống')
    }
    try {
      setSubmitting(true)
      await categoryApi.create(formData)
      toast.success('Thêm danh mục thành công!')
      setIsModalOpen(false) // Đóng modal
      setFormData({ Name: '', ParentId: '' }) // Reset form
      fetchCategories() // Load lại danh sách bài viết
    } catch (error) {
      toast.error('Lỗi: ' + (error.response?.data?.message || error.message))
    } finally {
      setSubmitting(false)
    }
  }

  // 1. Hàm mở Modal và đổ dữ liệu cũ vào
  const handleOpenEditModal = (cat) => {
    setEditData({
      Id: cat._id,
      Name: cat.Name,
      Status: cat.Status || 'Active', // Lấy status cũ của danh mục
      ParentId: cat.ParentId || ''
    })
    setIsEditModalOpen(true)
  }

  // 2. Xử lý thay đổi input trong Modal Sửa
  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  // 3. Xử lý gửi yêu cầu cập nhật
  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    if (!editData.Name.trim()) {
      return toast.error('Tên danh mục không được để trống')
    }
    try {
      setUpdating(true)
      await categoryApi.update(editData)
      toast.success('Cập nhật danh mục thành công!')
      setIsEditModalOpen(false)
      fetchCategories() // Load lại danh sách
    } catch (error) {
      toast.error('Lỗi: ' + (error.response?.data?.message || error.message))
    } finally {
      setUpdating(false)
    }
  }

  // 1. Khi bấm nút xóa trên bảng, lưu ID và mở Modal xác nhận
  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  // 2. Khi xác nhận xóa trong Modal
  const handleConfirmDelete = async () => {
    try {
      setDeleting(true)
      await categoryApi.delete(deleteId)
      toast.success('Xóa danh mục thành công!')
      setIsDeleteModalOpen(false)
      fetchCategories() // Tải lại danh sách
    } catch (error) {
      toast.error('Lỗi khi xóa: ' + (error.response?.data?.message || error.message))
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  // Hàm lấy dữ liệu từ API
  const fetchCategories = useCallback(async (currentPage = page) => {
    try {
      setLoading(true)
      const response = await categoryApi.getAllAdmin(currentPage, size)
      const result = response.data || response

      if (result && Array.isArray(result.data)) {
        setCategories(result.data)
        setTotal(result.total || result.data.length)
        setPage(currentPage)
      } else if (Array.isArray(result)) {
        setCategories(result)
        setTotal(result.length)
        setPage(currentPage)
      } else {
        setCategories([])
        setTotal(0)
      }
    } catch (error) {
      toast.error('Lỗi khi lấy danh mục: ' + (error.response?.data?.message || error.message))
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [page, size]) // fetchCategories sẽ thay đổi khi page hoặc size thay đổi

  // 3. Bây giờ bạn có thể thêm fetchCategories vào dependency mà không lo vòng lặp
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

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
          <button
            onClick={() => setIsModalOpen(true)} // Mở modal khi bấm
            className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-all shadow-lg"
          >
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
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400 italic">
        Đang tải dữ liệu, vui lòng đợi...
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr
                    key={cat._id}
                    // CHỈNH SỬA TẠI ĐÂY: Thêm màu nền hover rõ rệt hơn và hiệu ứng chuyển cảnh
                    className="group hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-all duration-200 cursor-default"
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-transparent h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {cat.Name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                        {cat._id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-slate-800 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
            0
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        cat.Status === 'Hidden'
                          ? 'bg-gray-100 text-slate-600 border-gray-200 dark:bg-gray-800 dark:text-slate-400 dark:border-gray-700'
                          : 'bg-emerald-100/50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.Status === 'Hidden' ? 'bg-slate-400' : 'bg-emerald-500'}`}></span>
                        {cat.Status === 'Hidden' ? 'Ẩn' : 'Hoạt động'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      {/* Nút hành động hiện rõ hơn khi hover vào dòng */}
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button
                          onClick={() => handleOpenEditModal(cat)} // Gọi hàm mở modal kèm dữ liệu dòng hiện tại
                          className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(cat._id)} // Truyền ID của dòng hiện tại
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-100 transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-card-dark flex items-center justify-between">
          {(() => {
            const from = total === 0 ? 0 : (page - 1) * size + 1
            const to = Math.min(page * size, total)

            return (
              <p className="text-sm text-slate-500 dark:text-slate-400">
        Hiển thị <span className="font-medium text-slate-900 dark:text-white">{from}</span> đến{' '}
                <span className="font-medium text-slate-900 dark:text-white">{to}</span> trong số{' '}
                <span className="font-medium text-slate-900 dark:text-white">{total}</span> kết quả
              </p>
            )
          })()}

          <div className="flex items-center gap-2">
            {/* Nút lùi trang */}
            <button
              onClick={() => fetchCategories(page - 1)}
              disabled={page <= 1 || loading}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-slate-500 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>

            {/* Nút tiến trang */}
            <button
              onClick={() => fetchCategories(page + 1)}
              disabled={page * size >= total || loading}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-slate-500 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Thêm Mới */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thêm danh mục mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tên danh mục</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Công nghệ, Đời sống..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Danh mục cha (Tùy chọn)</label>
                <select
                  name="ParentId"
                  value={formData.ParentId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="">-- Chọn danh mục cha --</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.Name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Trạng thái</label>
                <select
                  name="Status"
                  value={formData.Status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white outline-none"
                >
                  <option value="Active">Hoạt động</option>
                  <option value="Hidden">Ẩn</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
            Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-900/20 disabled:opacity-50 transition-all"
                >
                  {submitting ? 'Đang lưu...' : 'Lưu dữ liệu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Chỉnh Sửa */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Chỉnh sửa danh mục</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tên danh mục</label>
                <input
                  type="text"
                  name="Name"
                  value={editData.Name}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Danh mục cha</label>
                <select
                  name="ParentId"
                  value={editData.ParentId}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="">-- Không có (Danh mục gốc) --</option>
                  {categories
                    .filter(c => c._id !== editData.Id) // Không cho phép chọn chính nó làm cha
                    .map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.Name}</option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Trạng thái</label>
                <select
                  name="Status"
                  value={editData.Status}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white outline-none"
                >
                  <option value="Active">Hoạt động</option>
                  <option value="Hidden">Ẩn</option>
                </select>
              </div>

              {/* Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-slate-600 font-bold rounded-lg hover:bg-gray-50 transition-all"
                >
            Hủy
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 transition-all"
                >
                  {updating ? 'Đang lưu...' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all">
            <div className="p-6 text-center">
              {/* Icon cảnh báo */}
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Xác nhận xóa?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
          Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa danh mục này?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
            Hủy bỏ
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg shadow-red-900/20 disabled:opacity-50 transition-all"
                >
                  {deleting ? 'Đang xóa...' : 'Đồng ý xóa'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement