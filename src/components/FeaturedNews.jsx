// src/components/FeaturedNews.jsx
import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import ArticleItem from './ArticleItem'

const FeaturedNews = () => {
  const [featuredData, setFeaturedData] = useState({ main: null, subs: [] })

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosClient.get('/admin/news/news-list?limit=4')
        // Truy cập vào thuộc tính .data bên trong response.data
        const newsArray = response.data.data

        if (newsArray && newsArray.length > 0) {
          // Map dữ liệu cho đúng với Props của ArticleItem
          const formatted = newsArray.map(item => ({
            id: item._id,
            title: item.Title,
            description: item.Content,
            image: item.Image,
            time: 'Vừa xong'
          }))

          setFeaturedData({
            main: formatted[0], // Tin đầu tiên làm 'main'
            subs: formatted.slice(1) // Các tin còn lại làm 'title-only'
          })
        }
      } catch (error) {
        console.error('Lỗi:', error)
      }
    }
    fetchNews()
  }, [])

  if (!featuredData.main) return null

  return (
    <section className="container mx-auto p-4 md:p-6 border-b border-gray-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tin Chính bên trái */}
        <div className="lg:col-span-8 border-r border-gray-100 pr-6">
          <ArticleItem data={featuredData.main} type="main" />
        </div>
        {/* 3 Tin phụ bên phải */}
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