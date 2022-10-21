import avatarInformationStyle from './avatarInformation.module.css'
import { ClockCircleFilled, DatabaseFilled, TagFilled } from '@ant-design/icons'
import dayjs from 'dayjs'

const AvatarInfomation = ({ articleInfo }) => {
  return (
    <>
      <div className={avatarInformationStyle.title}>{articleInfo?.title}</div>
      <div className={avatarInformationStyle.avatarWrap}>
        {articleInfo?.author && (
          <img className={avatarInformationStyle.avatar} src="./avatar.png" />
        )}
        <div className={avatarInformationStyle.rightDiv}>
          {articleInfo?.author}
          <p className={avatarInformationStyle.tagCtx}>
            {articleInfo?.createTime && (
              <>
                <ClockCircleFilled />
                {dayjs(articleInfo?.createTime)?.fromNow()} &nbsp;&nbsp;
              </>
            )}
            {articleInfo?.categories && (
              <>
                <DatabaseFilled />
                {articleInfo?.categories} &nbsp;&nbsp;
              </>
            )}
            {articleInfo?.tags && (
              <>
                <TagFilled />
                {articleInfo?.tags}
              </>
            )}
          </p>
        </div>
      </div>
    </>
  )
}

export default AvatarInfomation
