import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import ArticleItem from './ArticleItem'

const FeaturedNews = () => {
  const [featuredData, setFeaturedData] = useState({ main: null, subs: [] })

  // Hàm bổ trợ: Loại bỏ HTML và cắt ngắn văn bản
  const getSummary = (content, maxLength = 160) => {
    if (!content) return ''
    // Loại bỏ các thẻ HTML để lấy văn bản thuần
    const plainText = content.replace(/<[^>]*>?/gm, '')
    if (plainText.length <= maxLength) return plainText
    return plainText.substring(0, maxLength).trim() + '...'
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosClient.get('/admin/news/news-list?limit=4')
        const newsArray = response.data.data

        if (newsArray && newsArray.length > 0) {
          // Map dữ liệu và tối ưu hóa phần mô tả (description)
          const formatted = newsArray.map(item => ({
            id: item._id,
            title: item.Title,
            // Chỉ lấy tối đa 160 ký tự văn bản thuần cho trang chủ
            description: getSummary(item.Content, 160),
            image: item.Image,
            time: 'Vừa xong'
          }))

          setFeaturedData({
            main: formatted[0], // Bài đầu tiên làm tin chính
            subs: formatted.slice(1) // 3 bài tiếp theo làm tin phụ
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Lỗi khi lấy tin nổi bật:', error)
      }
    }
    fetchNews()
  }, [])

  if (!featuredData.main) return null

  return (
    <section className="container mx-auto p-4 md:p-6 border-b border-gray-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tin Chính bên trái - chiếm 8/12 cột */}
        <div className="lg:col-span-8 border-r border-gray-100 pr-6">
          <ArticleItem data={featuredData.main} type="main" />
        </div>

        {/* 3 Tin phụ bên phải - chiếm 4/12 cột */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          {featuredData.subs.map((story) => (
            <ArticleItem key={story.id} data={story} type="title-only" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedNews