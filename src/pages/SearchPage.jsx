import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import newsApi from '../api/newsApi'
import ArticleItem from '../components/ArticleItem'
import { toast } from 'react-toastify'

const SearchPage = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Lấy từ khóa 'q' từ URL: /search?q=abc
  const query = new URLSearchParams(location.search).get('q')

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return
      try {
        setLoading(true)
        // Gọi API với tham số search
        const response = await newsApi.getAll({ search: query })

        if (response && response.data && Array.isArray(response.data.data)) {
          setNews(response.data.data)
        } else {
          setNews([])
        }
      } catch (error) {
        toast.error('Lỗi:' + error)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  if (loading) return <div className="text-center p-10">Đang tìm kiếm...</div>

  return (
    <div className="container mx-auto px-4 mt-6">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-vn-red inline-block pb-2">
        KẾT QUẢ TÌM KIẾM CHO: "{query}"
      </h2>

      {news.length > 0 ? (
        <div className="space-y-2">
          {news.map((item) => (
            <ArticleItem key={item._id} article={item} type="horizontal" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Không tìm thấy bài viết nào khớp với từ khóa của bạn.
        </div>
      )}
    </div>
  )
}

export default SearchPage