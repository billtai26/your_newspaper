import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import ArticleItem from './ArticleItem'
import { toast } from 'react-toastify'

const FeaturedNews = () => {
  const [featuredData, setFeaturedData] = useState({ main: null, subs: [] })

  const getSummary = (content, maxLength = 160) => {
    if (!content) return ''
    const plainText = content.replace(/<[^>]*>?/gm, '')
    if (plainText.length <= maxLength) return plainText
    return plainText.substring(0, maxLength).trim() + '...'
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Lấy 5 tin đầu tiên từ API
        const response = await axiosClient.get('/admin/news/news-list?limit=5')
        const newsArray = response.data.data

        if (newsArray && newsArray.length > 0) {
          const formatted = newsArray.map(item => ({
            id: item._id,
            title: item.Title,
            description: getSummary(item.Content, 150),
            image: item.Image
            // time: '2 giờ trước'
          }))

          setFeaturedData({
            main: formatted[0],
            subs: formatted.slice(1) // 4 bài tiếp theo
          })
        }
      } catch (error) {
        toast.error('Lỗi lấy tin nổi bật:', error)
      }
    }
    fetchNews()
  }, [])

  if (!featuredData.main) return null

  return (
    <section className="bg-white py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CỘT TRÁI: Tin Chính (Chiếm 7/12 cột) */}
        <div className="lg:col-span-7 border-r-0 lg:border-r border-gray-100 lg:pr-8">
          <ArticleItem data={featuredData.main} type="main" />
        </div>

        {/* CỘT PHẢI: Lưới 4 tin phụ (Chiếm 5/12 cột, chia 2 cột nhỏ) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-8">
          {featuredData.subs.map((story) => (
            <ArticleItem key={story.id} data={story} type="sub-grid" />
          ))}
        </div>
      </div>
      <div className="mt-8 border-b border-gray-200"></div>
    </section>
  )
}

export default FeaturedNews