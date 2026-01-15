import React, { useState, useEffect, useCallback } from 'react'
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
    Images: [] // Bây giờ là chuỗi URL
  })
  const [deleteId, setDeleteId] = useState(null)

  // Pagination state
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalDocs: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ search: '', categoryId: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const fetchPosts = useCallback(async () => {
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
      toast.error('Lỗi: ' + error.message)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, filters.search, filters.categoryId])

  // Logic Debounce cho tìm kiếm
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }))
      setPagination(prev => ({ ...prev, page: 1 })) // Reset về trang 1 khi tìm kiếm
    }, 500) // Chờ 500ms sau khi ngừng gõ mới gọi API

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await categoryApi.getAllAdmin(1, 100)
        // Xử lý an toàn: lấy body từ axios response hoặc dùng trực tiếp nếu đã unwrapped
        const result = res.data || res

        // Dựa trên JSON bạn gửi: result là { data: [...], total: 8 }
        // Vậy mảng nằm ở result.data
        setCategories(result.data || [])
      } catch (error) {
        toast.error('Lỗi khi fetch categories:', error)
        setCategories([])
      }
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
        CategoryId: post.CategoryId || '',
        Images: post.Images || (post.Image ? [post.Image] : [])
      })
    } else {
      setIsEditing(false)
      setFormData({ Id: '', Title: '', Author: '', Content: '', CategoryId: '', Images: [] })
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

  const handleImageChange = (index, value) => {
    const newImages = [...formData.Images]
    newImages[index] = value
    setFormData({ ...formData, Images: newImages })
  }

  const addImageField = () => setFormData({ ...formData, Images: [...formData.Images, ''] })
  const removeImageField = (index) => {
    const newImages = formData.Images.filter((_, i) => i !== index)
    setFormData({ ...formData, Images: newImages })
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
      <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* THANH TÌM KIẾM (Bên trái) */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
      search
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm tiêu đề bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-primary transition-all"
          />
        </div>

        {/* BỘ LỌC DANH MỤC (Bên phải) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Lọc theo:</span>
          <select
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-primary min-w-[180px] shadow-sm"
            value={filters.categoryId}
            onChange={(e) => {
              setFilters({ ...filters, categoryId: e.target.value })
              setPagination(prev => ({ ...prev, page: 1 }))
            }}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.Name} {/* Chữ N viết hoa đúng như JSON API */}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Bài viết</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
                  Danh mục
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Tác giả</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ngày tạo</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
            // 1. Hiển thị khi đang tải dữ liệu
              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-400 italic">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang tải danh sách bài viết...</span>
                  </div>
                </td>
              </tr>
            ) : posts.length === 0 ? (
            // 2. Hiển thị khi mảng posts rỗng (Không có kết quả sau khi lọc/tìm kiếm)
              <tr>
                <td colSpan="5" className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/10">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700">
            article_off
                    </span>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
              Không có bài viết nào
                      </p>
                      <p className="text-sm text-slate-400">
                        {filters.search || filters.categoryId
                          ? 'Thử thay đổi từ khóa hoặc danh mục bộ lọc khác'
                          : 'Hệ thống hiện chưa có bài viết nào'}
                      </p>
                    </div>
                    {(filters.search || filters.categoryId) && (
                      <button
                        onClick={() => {
                          setSearchTerm('')
                          setFilters({ search: '', categoryId: '' })
                        }}
                        className="mt-2 text-sm font-semibold text-primary hover:underline"
                      >
              Xóa tất cả bộ lọc
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
            // 3. Hiển thị danh sách khi có dữ liệu
              posts.map((post) => (
                <tr
                  key={post._id}
                  className="group hover:bg-blue-50/40 dark:hover:bg-slate-800/70 transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary cursor-default"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={(post.Images && post.Images.length > 0) ? post.Images[0] : (post.Image || 'https://via.placeholder.com/150')}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          alt={post.Title}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                          {post.Title}
                        </div>
                        <div className="text-xs text-slate-500">{post.Views || 0} lượt xem</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      {post.CategoryName || 'Chưa phân loại'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {post.Author}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {post.CreatedAt ? new Date(post.CreatedAt).toLocaleDateString('vi-VN') : '---'}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                      <button onClick={() => handleOpenModal(post)} className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDeleteClick(post._id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 justify-between">
    Danh sách hình ảnh (URL)
                    <button type="button" onClick={addImageField} className="text-primary text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">add_circle</span> Thêm ảnh
                    </button>
                  </label>

                  <div className="space-y-3">
                    {formData.Images.map((url, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="Dán link ảnh vào đây"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-primary"
                          />
                          {url && (
                            <img src={url} className="mt-1 h-16 w-24 object-cover rounded border" alt="Preview"
                              onError={(e) => e.target.style.display = 'none'} />
                          )}
                        </div>
                        <button type="button" onClick={() => removeImageField(index)} className="mt-2 text-red-500">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                    {formData.Images.length === 0 && (
                      <p className="text-xs text-slate-400 italic">Chưa có hình ảnh nào được thêm.</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
    Nội dung bài viết
                </label>
                <textarea
                  name="Content"
                  rows="10"
                  value={formData.Content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-primary"
                  required
                ></textarea>
                <p className="mt-1 text-xs text-slate-500 italic">
    * Mẹo: Gõ <span className="font-bold text-primary">[image]</span> vào nơi bạn muốn chèn một hình ảnh từ danh sách bên trên.
                </p>
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