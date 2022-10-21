import React, { useEffect, useState } from 'react'
import { Row, Col, Menu, BackTop } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import headerStyles from './header.module.css'
import { author } from '../../package.json'

const Header = () => {
  const menuStylesObj = {
    textAlign: 'right',
    width: 'max(5rem)',
    border: 'none',
    fontSize: '.09rem',
    color: '#50505c',
    background: 'rgba(0,0,0,0)',
    justifyContent: 'flex-end'
  }

  const [scrollOffset, setScrollOffset] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const currentRouter = useRouter().pathname

  useEffect(() => {
    setClientHeight(window.innerHeight)
    const scrollHandler = () => {
      setScrollOffset(window.scrollY)
    }
    const responsiveClientHeightHandler = () => {
      setClientHeight(window.innerHeight)
    }
    window.addEventListener('scroll', scrollHandler, false)
    window.addEventListener('resize', responsiveClientHeightHandler, false)
    return () => {
      window.removeEventListener('scroll', scrollHandler, false)
      window.removeEventListener('resize', responsiveClientHeightHandler, false)
    }
  }, [])

  return (
    <>
      <div
        className={`${headerStyles.header} ${scrollOffset >= clientHeight && headerStyles.hide}`}
      >
        <div className={`${headerStyles.author}`}>
          <img className={headerStyles.avatar} src="./avatar.png" />
          {`${author}'s blog`}
        </div>
        <Menu mode="horizontal" selectedKeys={[currentRouter]} style={menuStylesObj}>
          <Menu.Item key="/">
            <Link href="/">home</Link>
          </Menu.Item>
          <Menu.Item key="/doc">
            <Link href="/doc">doc</Link>
          </Menu.Item>
          <Menu.Item key="/threeD">
            <Link href="/threeD">3d</Link>
          </Menu.Item>
        </Menu>
      </div>
      <BackTop>
        <div className={headerStyles.backTop}>Up</div>
      </BackTop>
    </>
  )
}

export default Header
