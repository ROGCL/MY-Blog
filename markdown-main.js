const path = require('path');
const fs = require('fs');
const {author} = require('./package.json');

const TAGS = ["Vue", "源码", "源码阅读", "PostCSS", "HTML", "Npm", "Redis", "Linux", "Unix", "Github", "Gitlab", "Git", "Dos", "Yarn", "Pnpm", "Node.js", "CSS3", "GSAP", "Three.js", "GIS", "d3", "生活", "React", "Webpack", "DevOps", "Vite", "Node.js", "Npm", "Rollup", "Sass", "Less", "算法", "数据结构", "MySQL", "Electron", "PWA", "前端工程化", "TypeScript", "Uniapp", "Flutter", "React-Native"];
const CATEGORIES = ["前端", "工程化", "源码阅读", "后端", "运维", "网络工程", "网络安全", "DevOps", "数据结构与算法", "动画", "硬件"]

const readReadMeDir = () => {
  return new Promise((resolve, reject) => {
    fs.readdir('./readMe', (err, files) => {
      if (err) reject(err);
      const res = files.filter(_ => /\.md/.test(_)).map(fileName => {
        const stat = fs.statSync(path.join('./readMe', fileName))
        const tags = TAGS.filter(tag => fileName.includes(tag))
        const categories = CATEGORIES.filter(c => fileName.includes(c))
        return {
          title: fileName,
          content: fileName,
          tags,
          categories,
          createTime: stat.ctime,
          author: author
        }
      })
      resolve(res);
    })
  })
}

const writeIndexJs = (content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, '/readMe/mdFiles.json'), content, (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}

(async function() {
  const mdFiles = await readReadMeDir();
  await writeIndexJs(JSON.stringify(mdFiles))
})()