import ArticleItem from './ArticleItem'

const FeaturedNews = () => {
  // Mock data
  const mainStory = {
    title: 'Giá vàng nhẫn trơn lập đỉnh lịch sử, vượt 84 triệu đồng',
    description: 'Mỗi lượng vàng nhẫn trơn sáng nay tăng gần 1 triệu đồng, lên đỉnh lịch sử mới 84,3 triệu đồng, trong khi vàng miếng SJC đi ngang.',
    image: 'https://images.unsplash.com/photo-1610375461246-83648bf018c5?q=80&w=800&auto=format&fit=crop',
    time: '2 giờ trước'
  }

  const subStories = [
    { title: 'Đề xuất CSGT được hóa trang bắn tốc độ', description: 'Bộ Công an đề xuất CSGT được mặc thường phục để vận hành thiết bị kỹ thuật nghiệp vụ.' },
    { title: 'Nga tuyên bố kiểm soát thêm làng ở Donetsk', description: 'Bộ Quốc phòng Nga thông báo quân đội nước này đã giành quyền kiểm soát làng Zhelanne.' },
    { title: 'HLV Kim Sang-sik: "Tuyển Việt Nam sẽ khác khi đấu Ấn Độ"', description: 'HLV trưởng tuyển Việt Nam khẳng định đội tuyển sẽ trình diễn bộ mặt tích cực hơn.' }
  ]

  return (
    <section className="bg-white p-4 md:p-6 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cột Tin Chính (Chiếm 8 phần) */}
          <div className="lg:col-span-8 border-r border-gray-100 pr-0 lg:pr-6">
            <ArticleItem data={mainStory} type="main" />
          </div>

          {/* Cột Tin Phụ (Chiếm 4 phần) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            {subStories.map((story, index) => (
              <ArticleItem key={index} data={story} type="title-only" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedNews
