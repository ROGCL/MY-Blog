import Link from 'next/link'
import docStyles from '../../styles/doc.module.css'
import mdFiles from '../../readMe/mdFiles.json'
import dayjs from 'dayjs'

const Doc = () => {
  const formatList = {}
  mdFiles.map((item) => {
    const year = item.createTime.substring(0, 4)
    if (formatList.hasOwnProperty(year)) {
      formatList[year].push(item)
    } else {
      formatList[year] = []
      formatList[year].push(item)
    }
  })

  return (
    <div className={docStyles.container}>
      {Object.entries(formatList).map((item, dix) => {
        return (
          <div className={docStyles.itemWrap} key={`docItem${dix}`}>
            <div className={docStyles.title}>
              {item[0] ?? ''}
              <span>{`[${item[1].length}]`}</span>
            </div>
            {item[1].map((file, index) => (
              <Link
                href={`/docDetail?title=${file.title.replace(/\.md/, '')}`}
                key={`docChildrenItem${index}`}
              >
                <div className={docStyles.item}>
                  <div>{file.title.replace(/\.md/, '')}</div>
                  <div>{dayjs(file.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>
              </Link>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Doc
