import React from 'react'
import { MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const ArticleItem = ({ data, type = 'horizontal', className = '' }) => {
  const { id, title, description, image, time, related } = data

  // 1. Dạng Tin Chính (Dùng ở cột trái FeaturedNews)
  if (type === 'main') {
    return (
      <div className={`group cursor-pointer ${className}`}>
        <Link to={`/article/${id}`}>
          <div className="overflow-hidden bg-gray-200 mb-3 rounded-sm">
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-3 group-hover:text-vn-red transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        {/* Giới hạn hiển thị tối đa 3 dòng cho mô tả tin chính */}
        <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    )
  }

  // 2. Dạng Chỉ Tiêu Đề (Dùng ở cột phải FeaturedNews)
  if (type === 'title-only') {
    return (
      <div className={`group cursor-pointer border-b border-gray-100 py-3 last:border-0 ${className}`}>
        <Link to={`/article/${id}`}>
          <h3 className="text-lg font-bold leading-snug group-hover:text-vn-red transition-colors mb-1 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2">
          {description}
        </p>
      </div>
    )
  }

  // 3. Dạng Nằm Ngang (Dùng cho danh sách tin bên dưới)
  if (type === 'horizontal') {
    return (
      <div className={`flex gap-4 border-b border-gray-200 py-5 last:border-0 group cursor-pointer ${className}`}>
        <Link to={`/article/${id}`} className="w-1/3 md:w-60 shrink-0">
          <div className="overflow-hidden rounded-sm aspect-video">
            <img src={image} alt={title} className="w-full h-full object-cover bg-gray-100 group-hover:scale-105 transition-transform" />
          </div>
        </Link>
        <div className="flex-1">
          <Link to={`/article/${id}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-vn-red transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 hidden md:block">
            {description}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{time}</span>
            {related > 0 && (
              <span className="flex items-center gap-1 text-vn-red">
                <MessageSquare size={12} /> {related}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 4. Mặc định (Dùng cho Sidebar)
  return (
    <div className={`group cursor-pointer py-3 border-b border-gray-100 last:border-0 ${className}`}>
      <Link to={`/article/${id}`}>
        <h3 className="text-base font-bold mb-2 group-hover:text-vn-red transition-colors line-clamp-2">
          {title}
        </h3>
      </Link>
      <div className="flex gap-3">
        {image && (
          <Link to={`/article/${id}`} className="shrink-0">
            <img src={image} alt={title} className="w-24 h-16 object-cover rounded-sm" />
          </Link>
        )}
        <p className="text-gray-500 text-xs line-clamp-3 flex-1">{description}</p>
      </div>
    </div>
  )
}

export default ArticleItem
