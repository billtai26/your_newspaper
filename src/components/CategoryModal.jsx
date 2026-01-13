import { X } from 'lucide-react'

const CategoryModal = ({ isOpen, onClose, categories }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop: Lớp nền mờ bên dưới */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Nội dung Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        {/* Header của Modal */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Tất cả danh mục</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Danh sách danh mục */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <a
              key={cat._id}
              href={`/category/${cat._id}`}
              className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700 font-medium hover:bg-vn-red hover:text-white transition-all text-center"
              onClick={onClose}
            >
              {cat.Name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryModal