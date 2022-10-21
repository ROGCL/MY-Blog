import { ClockCircleFilled, DatabaseFilled, TagFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import articleItemStyles from './articleItem.module.css'
import Link from 'next/link'

const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)

const ArticleItem = ({ dataSource }) => {
  return (
    <Link
      href={`/docDetail?title=${dataSource.title.replace(/\.md/, '')}`}
      key={`articleDocItem${dataSource.createTime.toString()}`}
    >
      <div className={articleItemStyles.container}>
        <div className={articleItemStyles.title}>{dataSource.title.replace(/\.md/, '')}</div>
        <div className={articleItemStyles.content}>{dataSource.content.replace(/\.md/, '')}</div>
        <div className={articleItemStyles.infoWrap}>
          {dataSource.createTime && (
            <>
              <ClockCircleFilled />
              <span className="text-ellipsis">{dayjs(dataSource.createTime).fromNow()}</span>
            </>
          )}
          {dataSource.categories?.length > 0 && (
            <>
              <DatabaseFilled />
              <span className="text-ellipsis">{dataSource.categories}</span>
            </>
          )}
          {dataSource.tags?.length > 0 && (
            <>
              <TagFilled />
              <span className="text-ellipsis">
                {dataSource.tags.map((item, index) =>
                  index + 1 !== dataSource.tags.length ? `${item} | ` : `${item}`
                )}
              </span>
            </>
          )}

          <div className={articleItemStyles.posiMore}>Read more</div>
        </div>
      </div>
    </Link>
  )
}

export default ArticleItem
