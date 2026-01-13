import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import newsApi from '../api/newsApi' // Đảm bảo bạn đã có newsApi
import ArticleItem from '../components/ArticleItem'
import { toast } from 'react-toastify'

const CategoryPage = () => {
  const { id } = useParams() // Lấy ID danh mục từ URL
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      try {
        setLoading(true)
        const response = await newsApi.getAll({ category: id })

        // SỬA TẠI ĐÂY:
        // response.data là JSON từ server
        // response.data.data mới là mảng bài viết [...]
        if (response && response.data && Array.isArray(response.data.data)) {
          setNews(response.data.data) // Gán mảng bài viết vào state
        } else {
          setNews([])
        }
      } catch (error) {
        toast.error('Lỗi: ' + (error.response?.data?.message || error.message))
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNewsByCategory()
  }, [id]) // Load lại mỗi khi ID danh mục thay đổi

  if (loading) return <div className="container mx-auto p-10 text-center">Đang tải...</div>

  return (
    <div className="container mx-auto px-4 mt-6">
      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <ArticleItem key={item._id} article={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Chưa có bài viết nào trong mục này.
        </div>
      )}
    </div>
  )
}

export default CategoryPage