import ArticleItem from './ArticleItem'

const NewsList = ({ data }) => {
  if (!data || data.length === 0) return <p>Không có tin tức khác.</p>

  return (
    <div className="space-y-2">
      {data.map(item => (
        <ArticleItem key={item._id} article={item} type="horizontal" />
      ))}
    </div>
  )
}

export default NewsList