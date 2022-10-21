import ArticleItem from '../components/articleItem'
import MyButton from '../components/Button'
import indexStyles from '../styles/index.module.css'
import filesName from '../readMe/mdFiles.json'

const Index = () => {
  return (
    <div>
      {filesName.map((item, index) => (
        <ArticleItem dataSource={item} key={index + 'articleItem'} />
      ))}
      {filesName.length > 0 && (
        <div className={indexStyles.pagination}>
          <div className={indexStyles.posiLeft}>
            <MyButton title="Prev" />
          </div>
          <div className={indexStyles.posiRight}>
            <MyButton title="Next" />
          </div>
        </div>
      )}
      {filesName.length === 0 && '博主太懒了，暂时没有写文章~'}
    </div>
  )
}

export default Index
