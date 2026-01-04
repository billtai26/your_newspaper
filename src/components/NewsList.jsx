import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import ArticleItem from './ArticleItem'

const NewsList = () => {
  const [listNews, setListNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosClient.get('/admin/news/news-list')
        // Quan trọng: lấy response.data.data
        const newsArray = response.data.data

        if (Array.isArray(newsArray)) {
          setListNews(newsArray)
        }
      } catch (error) {
        console.error('Lỗi:', error)
      }
    }

    fetchNews()
  }, [])

  if (loading) return <div className="text-center py-10">Đang tải tin tức...</div>

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-full">
          <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-2">
            <h3 className="text-lg font-bold text-vn-red uppercase">Mới nhất</h3>
          </div>
          <div className="flex flex-col">
            {listNews.map((item) => (
              <ArticleItem
                key={item._id}
                data={{
                  id: item._id,
                  title: item.Title, // Lưu ý: Backend dùng Title (chữ T hoa)
                  description: item.Content, // Map Content vào description
                  image: item.Image, // Đường dẫn ảnh từ Cloudinary
                  time: 'Vừa xong' // Bạn có thể map thêm trường ngày tạo nếu có
                }}
                type="horizontal"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsList