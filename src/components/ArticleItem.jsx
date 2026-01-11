import React from 'react'
import { MessageSquare, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const ArticleItem = ({ data, type = 'horizontal', className = '' }) => {
  const { id, title, description, image, time, related } = data

  // Tạo một biến imageSrc để xử lý lỗi chuỗi rỗng
  // Nếu image rỗng hoặc undefined, ta gán null hoặc link ảnh mặc định
  const imageSrc = image && image.trim() !== '' ? image : null
  // Hoặc dùng ảnh mặc định: const imageSrc = image || "https://via.placeholder.com/400x225?text=No+Image";

  // 1. Dạng Tin Chính (1 tin to bên trái)
  if (type === 'main') {
    return (
      <div className={`group cursor-pointer ${className}`}>
        <Link to={`/article/${id}`}>
          <div className="overflow-hidden bg-gray-100 mb-4 rounded-lg aspect-video">
            {/* Kiểm tra nếu có imageSrc thì mới render ảnh để tránh lỗi console */}
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">Không có ảnh</div>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-vn-red transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    )
  }

  // 2. Dạng Tin Phụ (4 tin bên phải - Layout mới cực kỳ cân đối)
  if (type === 'sub-grid') {
    return (
      <div className={`group cursor-pointer flex flex-col ${className}`}>
        <Link to={`/article/${id}`}>
          <div className="overflow-hidden bg-gray-100 mb-2 rounded-md aspect-16/10">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}
          </div>
          <h3 className="text-[15px] font-bold leading-snug group-hover:text-vn-red transition-colors line-clamp-3 mb-1">
            {title}
          </h3>
        </Link>
      </div>
    )
  }

  // 3. Dạng Nằm Ngang (Hiển thị Full chiều ngang cho các tin còn lại)
  if (type === 'horizontal') {
    return (
      <div className={`flex flex-col md:flex-row gap-5 border-b border-gray-100 py-6 last:border-0 group cursor-pointer ${className}`}>
        <Link to={`/article/${id}`} className="w-full md:w-[280px] shrink-0">
          <div className="overflow-hidden rounded-lg aspect-video bg-gray-100">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
        </Link>
        <div className="flex flex-col flex-1">
          <Link to={`/article/${id}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-vn-red transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm mb-4 line-clamp-3">
            {description}
          </p>
          <div className="mt-auto flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Clock size={14}/> {time}</span>
            {related > 0 && (
              <span className="flex items-center gap-1 text-vn-red font-medium">
                <MessageSquare size={14} /> {related} Bình luận
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default ArticleItem