import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../codeBlock'
import MdNavBar from '../mdNavBar'

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <CodeBlock
        language={match[1]}
        PreTag="div"
        value={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    )
  }
}

const ArticleDetail = ({ docSource }) => {
  const [innerWidth, setInnerWidth] = React.useState(1920)

  const judgePlatform = () => {
    setInnerWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', judgePlatform, false)
    return () => {
      window.removeEventListener('resize', judgePlatform, false)
    }
  }, [])

  return (
    <div style={{ fontSize: '14px' }}>
      {innerWidth > 1540 && <MdNavBar articleDetail={docSource}></MdNavBar>}
      <ReactMarkdown children={docSource} components={components}></ReactMarkdown>
    </div>
  )
}

export default ArticleDetail
