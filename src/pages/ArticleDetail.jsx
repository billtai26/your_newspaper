import React from 'react'
import { MessageSquare, Share2, Clock } from 'lucide-react'
import NewsList from '../components/NewsList' // Tái sử dụng sidebar

const ArticleDetail = () => {
  // Giả lập dữ liệu của một bài báo (Sau này sẽ lấy qua API dựa trên ID)
  const article = {
    category: 'Giáo dục',
    title: 'TP HCM: Mỗi thầy, cô giáo là một tấm gương đạo đức',
    date: 'Thứ hai, 20/5/2024, 15:30 (GMT+7)',
    description: 'Lãnh đạo TP HCM mong muốn mỗi thầy cô giáo là tấm gương sáng về đạo đức, tự học và sáng tạo, góp phần nâng cao chất lượng giáo dục toàn diện.',
    content: [
      { type: 'text', value: 'Trong buổi lễ kỷ niệm ngày Nhà giáo Việt Nam, đại diện lãnh đạo thành phố đã nhấn mạnh vai trò quan trọng của đội ngũ sư phạm trong việc hình thành nhân cách thế hệ trẻ.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800', caption: 'Lãnh đạo thành phố phát biểu tại buổi lễ - Ảnh: Minh Tú' },
      { type: 'text', value: 'Bên cạnh việc truyền thụ kiến thức, các thầy cô còn là những người định hướng tư tưởng, đạo đức cho học sinh. Thành phố cam kết sẽ tiếp tục đầu tư cơ sở vật chất và có những chính sách hỗ trợ đời sống cho giáo viên.' }
    ],
    author: 'Anh Quân'
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* NỘI DUNG BÀI VIẾT (Cột trái - 2 phần) */}
        <div className="md:col-span-2">
          {/* Breadcrumb & Category */}
          <div className="flex items-center gap-2 text-vn-red font-bold text-sm mb-4 border-b border-gray-100 pb-2">
            <span className="uppercase">{article.category}</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 font-normal">{article.date}</span>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {article.title}
          </h1>

          {/* Sapo (Mô tả) */}
          <p className="text-lg font-bold mb-6 text-gray-800 leading-relaxed">
            {article.description}
          </p>

          {/* Nội dung chi tiết */}
          <div className="article-content text-lg leading-relaxed text-gray-700 space-y-6">
            {article.content.map((block, index) => (
              block.type === 'text' ? (
                <p key={index}>{block.value}</p>
              ) : (
                <figure key={index} className="my-6 text-center">
                  <img src={block.url} alt={article.title} className="w-full h-auto rounded-sm" />
                  <figcaption className="text-sm text-gray-500 mt-2 italic">
                    {block.caption}
                  </figcaption>
                </figure>
              )
            ))}
          </div>

          {/* Tác giả */}
          <div className="mt-8 text-right font-bold text-gray-800">
            {article.author}
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
              <span>Bình luận (12)</span>
            </div>
          </div>
        </div>

        {/* SIDEBAR (Cột phải - 1 phần) */}
        <div className="md:col-span-1 pl-0 md:pl-6 md:border-l border-gray-200">
          <div className="sticky top-6">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-vn-red inline-block">Tin liên quan</h3>
            <NewsList /> {/* Tái sử dụng danh sách tin ở sidebar */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ArticleDetail