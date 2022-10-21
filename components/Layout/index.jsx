import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Col, Row } from 'antd'
import { GithubFilled, WechatFilled, MailFilled } from '@ant-design/icons'
import Header from '../Header'
import styles from './layout.module.css'
import { author } from '../../package.json'

const GITHUB = 'https://github.com/ROGCL/MY-Blog.git'
const WEICHAT = '18996230050'
const EMAIL = 'anj5249@gmail.com'

const Layout = (props) => {
  const curRouter = useRouter().pathname
  const [platform, setPlatform] = React.useState('PC')

  React.useEffect(() => {
    const judgePlatform = () => {
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || (u.indexOf('Adr') > -1 && 'Android') //判断是否是 android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && 'IOS' //判断是否是 iOS终端
      setPlatform(isAndroid || isIOS || 'PC')
    }
    window.addEventListener('resize', judgePlatform, false)
    return () => {
      window.removeEventListener('resize', judgePlatform, false)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${author}'s blog`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {curRouter.indexOf('/doc') === -1 && (
        <div className={styles.bg}>
          金色的林荫道，丹红色的枫叶裹挟着对树枝的浓浓留念，丹霞中央一抹残阳的余晖映入眼中，爱是脑海中的一幅画，守护一生即是长情。
          <div className={styles.iconWrap}>
            <GithubFilled onClick={() => (window.location.href = GITHUB)} />
            <WechatFilled onClick={() => alert(`VChat: ${WEICHAT}`)} />
            <MailFilled onClick={() => alert(`Email: ${EMAIL}`)} />
          </div>
        </div>
      )}
      <div className={styles.mainContent}>
        <Row type="flex" justify="center">
          <Col span={platform !== 'PC' ? 22 : 14}>
            <div className={styles.routerView}>{props.children}</div>
          </Col>
        </Row>
      </div>
      <div className={styles.footer}>{`Powered by .Jacky@${author}`}</div>
    </div>
  )
}

export default Layout
