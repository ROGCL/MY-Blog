import React from 'react'
import ArticleDetail from '../../components/articleDetail'
import AvatarInfomation from '../../components/avatarInfomation'
import { useRouter } from 'next/router'
import MdNavBar from '../../components/mdNavBar'
import mdFiles from '../../readMe/mdFiles.json'

const docDetail = () => {
  const router = useRouter()
  const { title } = router.query
  const [source, setSource] = React.useState('')
  const [fileObj, setFileObj] = React.useState({})
  React.useEffect(() => {
    if (title) {
      const file = JSON.parse(JSON.stringify(mdFiles.find((_) => _.title === `${title}.md`)))
      file.title = title
      setFileObj(file)
      ;(async function () {
        const res = await import(`../../readMe/${title}.md`)
        setSource(res.default)
      })()
    }
  }, [title])

  return (
    <>
      <AvatarInfomation articleInfo={fileObj} />
      <ArticleDetail docSource={source}></ArticleDetail>
    </>
  )
}

export default docDetail
