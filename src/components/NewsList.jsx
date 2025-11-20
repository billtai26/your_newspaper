// src/components/NewsList.jsx
const NewsList = () => {
  // Dữ liệu giả lập
  const news = [
    {
      id: 1,
      title: 'TP HCM: Mỗi thầy, cô giáo là một tấm gương đạo đức',
      source: 'NGƯỜI LAO ĐỘNG',
      time: 'vài giây',
      related: '5 liên quan',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Giá vàng hôm nay 20/11: Tiếp đà tăng mạnh',
      source: 'VTC NEWS',
      time: '1 phút',
      related: '12 liên quan',
      image: 'https://images.unsplash.com/photo-1610375461246-83648bf018c5?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Dự báo thời tiết: Miền Bắc đón không khí lạnh tăng cường',
      source: 'DÂN TRÍ',
      time: '10 phút',
      related: '3 liên quan',
      image: 'https://images.unsplash.com/photo-1561553590-267fc716698c?q=80&w=200&auto=format&fit=crop'
    }
  ]

  return (
    <div className='flex flex-col gap-4'>
      {news.map((item) => (
        <div key={item.id} className='flex gap-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group'>
          <div className='w-1/3 h-24 overflow-hidden rounded'>
            <img
              src={item.image}
              alt={item.title}
              className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
            />
          </div>
          <div className='w-2/3 flex flex-col justify-between'>
            <h3 className='font-semibold text-gray-800 line-clamp-2 hover:text-blue-600'>
              {item.title}
            </h3>
            <div className='flex items-center gap-2 text-xs text-gray-400'>
              <span className='font-bold text-red-500 uppercase'>{item.source}</span>
              <span>•</span>
              <span>{item.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewsList
