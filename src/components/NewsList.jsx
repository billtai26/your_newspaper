import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import ArticleItem from './ArticleItem'
import { toast } from 'react-toastify'

const NewsList = () => {
  const [news, setNews] = useState([])

  const getSummary = (content, maxLength = 160) => {
    if (!content) return ''
    const plainText = content.replace(/<[^>]*>?/gm, '')
    return plainText.length <= maxLength ? plainText : plainText.substring(0, maxLength).trim() + '...'
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Lấy danh sách tin (ví dụ 15 tin)
        const response = await axiosClient.get('/admin/news/news-list?limit=15')
        const newsArray = response.data.data

        if (newsArray && newsArray.length > 5) {
          // Bỏ qua 5 tin đầu đã dùng ở FeaturedNews
          const remainingNews = newsArray.slice(5).map(item => ({
            id: item._id,
            title: item.Title,
            description: getSummary(item.Content, 200),
            image: item.Image,
            time: '2 giờ trước'
          }))
          setNews(remainingNews)
        }
      } catch (error) {
        toast.error('Lỗi NewsList:', error)
      }
    }
    fetchNews()
  }, [])

  return (
    <div className="space-y-2">
      {news.map(item => (
        // Hiển thị dạng ngang tràn chiều ngang màn hình
        <ArticleItem key={item.id} data={item} type="horizontal" />
      ))}
    </div>
  )
}

export default NewsList