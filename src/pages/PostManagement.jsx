import React, { useState, useEffect } from 'react'
import newsApi from '../api/newsApi'
import categoryApi from '../api/categoryApi'
import { toast } from 'react-toastify'

const PostManagement = () => {
  // State quản lý dữ liệu và UI
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Id: '',
    Title: '',
    Author: '',
    Content: '',
    CategoryId: '',
    Image: '' // Bây giờ là chuỗi URL
  })
  const [deleteId, setDeleteId] = useState(null)

  // Pagination state
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalDocs: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ search: '', categoryId: '' })

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await newsApi.getAllAdmin({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        categoryId: filters.categoryId
      })
      const resData = response.data || response
      setPosts(resData.data || [])
      if (resData.pagination) {
        setPagination(prev => ({
          ...prev,
          totalDocs: resData.pagination.totalItems || 0,
          totalPages: resData.pagination.totalPages || 0
        }))
      }
    } catch (error) {
      toast.error('Lỗi: ' + error.message )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [pagination.page, filters.categoryId])

  useEffect(() => {
    const fetchCats = async () => {
      const res = await categoryApi.getAllAdmin(1, 100)
      setCategories(res.data?.data || [])
    }
    fetchCats()
  }, [])

  // Xử lý mở Modal (Thêm/Sửa)
  const handleOpenModal = (post = null) => {
    if (post) {
      setIsEditing(true)
      setFormData({
        Id: post._id,
        Title: post.Title,
        Author: post.Author,
        Content: post.Content || '',
        CategoryId: post.CategoryId || '', // Đảm bảo lấy ID danh mục từ bài viết cũ
        Image: post.Image || ''
      })
    } else {
      setIsEditing(false)
      setFormData({ Id: '', Title: '', Author: '', Content: '', CategoryId: '', Image: '' })
    }
    setIsModalOpen(true)
  }

  // Xử lý Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Xử lý Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (isEditing) {
        await newsApi.update(formData)
        toast.success('Cập nhật thành công')
      } else {
        await newsApi.create(formData)
        toast.success('Thêm mới thành công')
      }
      setIsModalOpen(false)
      fetchPosts()
    } catch (error) {
      toast.error('Lỗi: ' + (error.response?.data?.message || error.message))
    } finally {
      setSubmitting(false)
    }
  }

  // Xử lý Xóa
  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await newsApi.delete(deleteId)
      toast.success('Đã xóa bài viết')
      setIsDeleteModalOpen(false)
      fetchPosts()
    } catch (error) {
      toast.error('Lỗi: ' + error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Quản lý bài viết</h2>
          <p className="text-slate-500">Danh sách tin tức trên hệ thống</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex gap-2 shadow-lg transition-all"
        >
          <span className="material-symbols-outlined">add</span> Viết bài mới
        </button>
      </div>

      {/* Stats & Filters (Giữ nguyên như cũ) */}
      <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <select
          className="bg-transparent border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
          value={filters.categoryId}
          onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.Name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Bài viết</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Tác giả</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ngày tạo</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-10 text-slate-400">Đang tải...</td></tr>
            ) : posts.map((post) => (
              <tr key={post._id} className="group hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={post.Image} className="w-16 h-12 object-cover rounded-lg bg-slate-100" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{post.Title}</div>
                      <div className="text-xs text-slate-500">{post.Views || 0} lượt xem</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{post.Author}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(post.CreatedAt).toLocaleDateString('vi-VN')}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(post)} className="p-2 text-slate-400 hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                    <button onClick={() => handleDeleteClick(post._id)} className="p-2 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{isEditing ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Tiêu đề</label>
                  <input type="text" name="Title" value={formData.Title} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-primary" required />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
        Danh mục bài viết
                  </label>
                  <select
                    name="CategoryId"
                    value={formData.CategoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white outline-none focus:border-primary"
                    required
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {cat.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Tác giả</label>
                  <input type="text" name="Author" value={formData.Author} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
    Link hình ảnh (URL)
                  </label>
                  <input
                    type="text"
                    name="Image"
                    value={formData.Image}
                    onChange={handleInputChange}
                    placeholder="Dán link ảnh vào đây"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-primary"
                  />
                  {formData.Image && (
                    <img
                      src={formData.Image}
                      className="mt-2 h-20 w-32 object-cover rounded border"
                      alt="Preview"
                      onError={(e) => e.target.style.display = 'none'} // Ẩn nếu link lỗi
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nội dung</label>
                <textarea name="Content" rows="6" value={formData.Content} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-primary" required></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all">Hủy</button>
                <button type="submit" disabled={submitting} className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 transition-all">
                  {submitting ? 'Đang lưu...' : (isEditing ? 'Cập nhật' : 'Lưu bài viết')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Xác nhận xóa bài viết?</h3>
            <p className="text-slate-500 mb-6">Hành động này không thể hoàn tác.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all">Hủy</button>
              <button onClick={handleConfirmDelete} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg transition-all">Xác nhận xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostManagement