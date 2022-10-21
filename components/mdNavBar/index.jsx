import React from 'react'
import { Anchor } from 'antd'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import mdNavBarStyle from './mdNavBar.module.css'

class MdNavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={mdNavBarStyle.docNavigation}>
        <Anchor>
          <div className="markNav-title">文章目录</div>
          <MarkNav
            className="article-menu"
            source={this.props.articleDetail}
            headingTopOffset={80}
          />
        </Anchor>
      </div>
    )
  }
}

export default MdNavBar
