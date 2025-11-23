import ArticleItem from './ArticleItem'

const NewsList = () => {
  // Dữ liệu giả lập
  const listNews = [
    { id: 1, title: 'TP HCM: Mỗi thầy, cô giáo là một tấm gương đạo đức', description: 'Lãnh đạo TP HCM mong muốn mỗi thầy cô giáo là tấm gương sáng về đạo đức, tự học và sáng tạo.', time: '2 giờ trước', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop', related: 5 },
    { id: 2, title: 'Không khí lạnh tăng cường, miền Bắc rét sâu', description: 'Đợt không khí lạnh mạnh nhất từ đầu mùa khiến nhiệt độ miền Bắc giảm sâu, vùng núi có nơi dưới 15 độ.', time: '4 giờ trước', image: 'https://images.unsplash.com/photo-1561553590-267fc716698c?q=80&w=400&auto=format&fit=crop', related: 2 },
    { id: 3, title: 'Công nghệ AI tạo sinh đang thay đổi ngành báo chí', description: 'Trí tuệ nhân tạo giúp các tòa soạn sản xuất nội dung nhanh hơn nhưng cũng đặt ra thách thức về bản quyền.', time: '5 giờ trước', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop', related: 0 },
    { id: 4, title: 'Tuyển dụng IT cuối năm: Nhu cầu cao, lương hấp dẫn', description: 'Thị trường tuyển dụng công nghệ thông tin sôi động trở lại vào dịp cuối năm.', time: '6 giờ trước', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop', related: 10 }
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cột Chính (Stream Tin - Chiếm 8 phần) */}
        <div className="lg:col-span-full">
          <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-2">
            <h3 className="text-lg font-bold text-vn-red uppercase">Mới nhất</h3>
            <span className="text-sm text-gray-500 cursor-pointer hover:text-vn-red">Tin nóng</span>
            <span className="text-sm text-gray-500 cursor-pointer hover:text-vn-red">Xem nhiều</span>
          </div>
          <div className="flex flex-col">
            {listNews.map(item => (
              <ArticleItem key={item.id} data={item} type="horizontal" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsList
