import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import React from 'react'
import { Button } from 'antd'

const ThreeDScene = () => {
  const [isAutoRotate, setIsAutoRotate] = React.useState(true)
  // 模型中的可交互 Mesh  ：map
  const cacheMeshArr = React.useRef([])
  // 场景
  const sceneRef = React.useRef(null)
  // 当前帧
  const idFrame = React.useRef(null)
  // 3Dmodel Objects
  const modelObj = React.useRef(null)
  // 光线投射，可以在三维空间中计算出鼠标移过了什么物体
  const raycaster = React.useRef(null)
  // 鼠标点
  const pointer = React.useRef(null)
  // 获取视窗宽高
  const getViewportRect = React.useCallback(() => {
    const divEle = sceneRef.current?.parentElement?.getBoundingClientRect()
    const divEleWidth = divEle.width - 40
    const divEleHeight = divEle.height - 80
    return { divEleWidth, divEleHeight }
  }, [])

  // 创建渲染器
  const renderer = React.useRef(null)
  const initRenderer = React.useCallback(() => {
    const { divEleWidth, divEleHeight } = getViewportRect()
    renderer.current.setPixelRatio(window.devicePixelRatio)
    renderer.current.outputEncoding = THREE.sRGBEncoding
    renderer.current.setSize(divEleWidth, divEleHeight)
    sceneRef.current?.appendChild(renderer.current.domElement)
  }, [renderer])

  // 创建场景
  const sceneInstance = new THREE.Scene()
  const initScene = React.useCallback(() => {
    sceneInstance.background = new THREE.Color(0xbfe3dd)
  }, [sceneInstance])

  // 创建灯光
  const lightInstance = new THREE.AmbientLight(0x404040, 100)
  const initLight = React.useCallback(() => {
    sceneInstance.add(lightInstance)
  }, [lightInstance])

  // 创建相机
  const cameraInstance = new THREE.PerspectiveCamera()
  const initCamera = React.useCallback(() => {
    const { divEleWidth, divEleHeight } = getViewportRect()
    const cameraInstance = new THREE.PerspectiveCamera(75, divEleWidth / divEleHeight, 0.1, 2000)
    cameraInstance.fov = 75
    cameraInstance.aspect = divEleWidth / divEleHeight
    cameraInstance.near = 0.1
    cameraInstance.far = 2000
    sceneInstance.add(cameraInstance)
  }, [cameraInstance])

  // 渲染3D模型
  const loader = new GLTFLoader().setPath('./forest_house/')
  const init3DModal = React.useCallback(() => {
    loader.load(
      'scene.gltf',
      (gltf) => {
        const model = gltf.scene
        modelObj.current = model
        model.scale.set(5.5, 5.5, 5.5)
        sceneInstance.add(model)
      }
      // (xhr) => {
      // },
      // (error) => {
      // }
    )
  }, [loader])

  //  控制器
  const controls = React.useRef(null)
  const initControls = React.useCallback(() => {
    controls.current.addEventListener('change', renders)
    controls.current.minDistance = 2
    controls.current.maxDistance = 10
    controls.current.target.set(0, -0.01, 0.01)
    controls.current.autoRotate = isAutoRotate
  }, [controls])

  // 渲染函数
  const renders = React.useCallback(() => {
    renderer.current.clear()
    // 通过摄像机和鼠标位置更新射线
    raycaster.current.setFromCamera(pointer.current, cameraInstance)
    // 计算物体和射线的交点
    const intersects = raycaster.current.intersectObjects(sceneInstance.children)
    // 如果有的上一次移动的 Mesh 缓存，则还原缓存的颜色和大小
    const [cacheMesh = null, cacheColor] = cacheMeshArr.current
    if (cacheMesh) {
      cacheMesh.material.color.set(cacheColor)
      cacheMesh.scale.set(1, 1, 1)
      // 还原后清空缓存
      cacheMeshArr.current = []
    }
    // 最近的 Mesh === intersects[0]，高亮放大并缓存原始色
    const mesh = intersects[0]?.object
    if (mesh) {
      cacheMeshArr.current = [mesh, JSON.parse(JSON.stringify(mesh.material.color))]
      mesh.material.color.set(0xff0000)
      mesh.scale.set(1.35, 1.35, 1.35)
    }
    // 渲染
    renderer.current.render(sceneInstance, cameraInstance)
  }, [renderer, sceneInstance, cameraInstance])

  // 循环动画
  const animate = React.useCallback(() => {
    renders()
    controls.current?.update()
    idFrame.current = requestAnimationFrame(animate)
  }, [controls])

  React.useEffect(() => {
    // DOM 加载后才可以实例化 renderer 和 controls
    renderer.current = new THREE.WebGLRenderer({ antialias: true })
    controls.current = new OrbitControls(cameraInstance, renderer.current.domElement)
    pointer.current = new THREE.Vector2()
    raycaster.current = new THREE.Raycaster()

    initScene()
    initCamera()
    init3DModal()
    initLight()
    initRenderer()
    initControls()
    animate()
    const resizeCallback = () => {
      const { divEleWidth, divEleHeight } = getViewportRect()
      cameraInstance.aspect = divEleWidth / divEleHeight
      renderer.current.setSize(divEleWidth, Math.min(divEleHeight, 800))
    }
    const pointerMoveCallback = (event) => {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('resize', resizeCallback)
    window.addEventListener('pointermove', pointerMoveCallback)
    return () => {
      window.removeEventListener('resize', resizeCallback)
      window.removeEventListener('pointermove', pointerMoveCallback)
    }
  }, [])

  const handleModel = (type) => {
    const modelScale = modelObj.current.scale
    const { x, y, z } = modelScale
    type === 'smaller' && modelScale.set(x - 1, y - 1, z - 1)
    type === 'bigger' && modelScale.set(x + 1, y + 1, z + 1)
    type === 'rotate' && setModelAutoRotate()
  }
  // 设置控制器是否自动旋转
  const setModelAutoRotate = () => {
    controls.current.autoRotate = !controls.current.autoRotate
    setIsAutoRotate(controls.current.autoRotate)
  }

  return (
    <>
      <div ref={sceneRef}></div>
      <div>带上爱的人，去北欧的乡村吧~</div>
      <Button type="primary" style={{ marginRight: '10px' }} onClick={() => handleModel('smaller')}>
        缩小
      </Button>
      <Button type="primary" style={{ marginRight: '10px' }} onClick={() => handleModel('bigger')}>
        放大
      </Button>
      <Button type="primary" onClick={() => handleModel('rotate')}>
        {isAutoRotate ? '停止' : '开启'}转动
      </Button>
    </>
  )
}

export default ThreeDScene
