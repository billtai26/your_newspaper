import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MessageSquare, Share2, Clock } from 'lucide-react'
import NewsList from '../components/NewsList'
import newsApi from '../api/newsApi'

const ArticleDetail = () => {
  const { id } = useParams() // Lấy ID từ URL (Ví dụ: /article/695b5796...)
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        setError(null)

        // Gọi API lấy chi tiết tin tức
        const response = await newsApi.getById(id)

        /* LƯU Ý: Tùy vào Backend của bạn trả về trực tiếp object hay bọc trong { data: ... }
          Dựa trên cấu trúc thường thấy ở project của bạn, ta lấy response.data
        */
        const data = response.data.data || response.data
        setArticle(data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Lỗi khi tải chi tiết tin tức:', err)
        setError('Không thể tải bài viết. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchArticle()
    }
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-500">
        <div className="animate-pulse">Đang tải nội dung bài viết...</div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Không tìm thấy bài viết'}</h2>
        <a href="/" className="text-vn-red hover:underline">Quay về trang chủ</a>
      </div>
    )
  }

  // Hàm xử lý hiển thị nội dung xen kẽ hình ảnh
  const renderContentWithImages = () => {
    if (!article.Content) return null

    // Nếu không có mảng Images, hiển thị văn bản bình thường
    if (!article.Images || article.Images.length === 0) {
      return <div className="whitespace-pre-line">{article.Content}</div>
    }

    // Tách nội dung văn bản dựa trên ký hiệu [image]
    const parts = article.Content.split('[image]')

    return (
      <div className="article-content text-lg leading-relaxed text-gray-700 space-y-4">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {/* Hiển thị đoạn văn bản */}
            <div className="whitespace-pre-line">{part}</div>

            {/* Chèn hình ảnh tương ứng nếu còn ảnh trong mảng */}
            {article.Images[index] && (
              <figure className="my-8">
                <img
                  src={article.Images[index]}
                  alt={`${article.Title} - ảnh ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </figure>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* NỘI DUNG BÀI VIẾT (Cột trái) */}
        <div className="md:col-span-2">
          {/* Breadcrumb & Category */}
          <div className="flex items-center gap-2 text-vn-red font-bold text-sm mb-4 border-b border-gray-100 pb-2">
            <span className="uppercase">{article.CategoryName || 'Tin tức'}</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 font-normal">
              {article.createdAt ? new Date(article.createdAt).toLocaleString('vi-VN') : 'Mới cập nhật'}
            </span>
          </div>

          {/* Tiêu đề (Sửa từ title thành Title) */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {article.Title}
          </h1>

          {/* Ảnh bìa bài viết nếu có (Sửa từ image thành Image) */}
          {renderContentWithImages()}


          {/* Nội dung chi tiết (Sửa từ content thành Content) */}
          {/* Dùng whitespace-pre-line để hiển thị các dấu xuống dòng (\n) từ database
             Nếu nội dung là HTML từ trình soạn thảo, hãy dùng dangerouslySetInnerHTML
          */}
          {/* <div className="article-content text-lg leading-relaxed text-gray-700 space-y-4 whitespace-pre-line">
            {article.Content}
          </div> */}

          {/* Tác giả (Sửa từ author thành Author) */}
          <div className="mt-8 text-right font-bold text-gray-800 border-t pt-4">
            Tác giả: {article.Author || 'Ban Biên Tập'}
          </div>

          {/* Footer bài viết: Chia sẻ & Bình luận */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 mt-8">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-sm text-gray-500 border px-3 py-1 rounded hover:bg-gray-50">
                <Share2 size={16} /> Chia sẻ
              </button>
            </div>
            <div className="flex items-center gap-2 text-vn-red font-bold cursor-pointer">
              <MessageSquare size={18} />
              <span>Bình luận</span>
            </div>
          </div>
        </div>

        {/* SIDEBAR (Cột phải) */}
        <div className="md:col-span-1 pl-0 md:pl-6 md:border-l border-gray-200">
          <div className="sticky top-6">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-vn-red inline-block">Tin liên quan</h3>
            <NewsList />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ArticleDetail