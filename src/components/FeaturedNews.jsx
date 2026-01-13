import ArticleItem from './ArticleItem'

const FeaturedNews = ({ data }) => {
  if (!data || data.length === 0) return null

  const main = data[0]
  const subs = data.slice(1)

  return (
    <section className="bg-white py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 lg:border-r border-gray-100 lg:pr-8">
          <ArticleItem article={main} type="main" />
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-8">
          {subs.map((story) => (
            <ArticleItem key={story._id} article={story} type="sub-grid" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedNews