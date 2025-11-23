import ArticleItem from './ArticleItem'

const RecentNews = () => {
  const articles = [
    {
      id: 1,
      title: 'Công nghệ AI tạo sinh đang thay đổi ngành báo chí',
      description: 'Trí tuệ nhân tạo giúp các tòa soạn sản xuất nội dung nhanh hơn nhưng cũng đặt ra thách thức về bản quyền và tính xác thực.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop',
      time: '30 phút trước',
      related: 0
    },
    {
      id: 2,
      title: 'Tuyển dụng IT cuối năm: Nhu cầu cao, lương hấp dẫn',
      description: 'Thị trường tuyển dụng công nghệ thông tin sôi động trở lại vào dịp cuối năm với nhu cầu lớn về nhân sự AI và Cloud.',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop',
      time: '1 giờ trước',
      related: 12
    },
    {
      id: 3,
      title: 'Du lịch Việt Nam đón lượng khách quốc tế kỷ lục',
      description: 'Các điểm đến nổi tiếng như Phú Quốc, Đà Nẵng, Hà Nội ghi nhận lượng khách tăng đột biến trong quý 4.',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=400&auto=format&fit=crop',
      time: '2 giờ trước',
      related: 5
    },
    {
      id: 4,
      title: 'Giá xăng dầu đồng loạt giảm từ 15h chiều nay',
      description: 'Liên Bộ Công Thương - Tài chính vừa quyết định điều chỉnh giảm giá bán lẻ các mặt hàng xăng dầu.',
      image: 'https://images.unsplash.com/photo-1625432826996-6471d991944f?q=80&w=400&auto=format&fit=crop',
      time: '3 giờ trước',
      related: 8
    }
  ]

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      {/* Tiêu đề mục */}
      <h3 className="text-lg font-bold mb-4 border-b border-gray-200 pb-2 text-gray-800">
        Tin mới nhất
      </h3>

      {/* Danh sách tin */}
      <div className="flex flex-col">
        {articles.map((item, index) => (
          <ArticleItem key={index} data={item} type="horizontal" />
        ))}
      </div>
    </div>
  )
}

export default RecentNews
