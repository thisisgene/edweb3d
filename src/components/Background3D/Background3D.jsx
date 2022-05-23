import React, {Suspense, useEffect, useRef, useState} from "react"
import {DoubleSide} from 'three'
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { OrbitControls,PerspectiveCamera, useGLTF, Effects } from "@react-three/drei"
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass'
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'
import {WaterPass} from './WaterPass'

import url from '../../assets/video.mp4'

import styles from './Background3D.module.sass'

extend({UnrealBloomPass, GlitchPass, FilmPass})



const TV = () => {
  
  const {nodes} = useGLTF('tv.gltf')
  
  const [video] = useState(() => {
    const vid = document.createElement("video")
    vid.src = url
    vid.crossOrigin = 'Anonymous'
    vid.loop = true
    vid.muted = true
    vid.play()
    return vid
  })

  return (
    <group
      position={[.8, 0, 1]}
      rotation={[0,Math.PI * -1.23, 0]}
    >
      <mesh
        geometry={nodes.TV.geometry}
      >
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh
        rotation={[0,0,Math.PI]}
        position={[0,0,1.03]}
      >
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial
          emissive={"white"}
          side={DoubleSide}
        >
          <videoTexture attach="map" args={[video]}/>
          <videoTexture attach="emissiveMap" args={[video]}/>
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}

const Floor = () => {
  return (
    <mesh 
    rotation={[-Math.PI / 2, 0, 0]}
    position={[-2, -1, 0]}
    >
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

const CanvasContainer = () => {
  const orbitRef = useRef(null)
  
  useFrame((state) => {
    const {x,y} = state.mouse
    let scrollTop = window.scrollY
    // orbitRef.current.setAzimuthalAngle(x/3)
    orbitRef.current.setPolarAngle(Math.PI / 2+y/3)
    orbitRef.current.setAzimuthalAngle(scrollTop/1000)
    // orbitRef.current.target([scrollTop/1000, 0, 0])
  })
  useEffect(() => {
    if (!!orbitRef) {
      console.log(orbitRef.current)
    }
  })
  return (
    <>
    <PerspectiveCamera makeDefault position={[0,0,3.5]} />
    {/* <Effects> */}
        {/* <unrealBloomPass attachArray="passes" /> */}
        {/* <waterPass attachArray="passes" factor={1} /> */}
        {/* <glitchPass attachArray="passes" /> */}
        {/* <filmPass attachArray="passes" /> */}
      {/* </Effects> */}
      <OrbitControls
        ref={orbitRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />
      <fog attach="fog" args={["#000", 1, 7]}/>
      <directionalLight intensity={0.1} color={'turquoise'}/>
      <Suspense fallback={null}>
      <TV />
      </Suspense>
      <Floor />
    </>
  )
}

const Background3D = () => {
  return (
    <div className={styles['canvas']}>
    <Canvas>
      <CanvasContainer />
    </Canvas>
    </div>
  )
}

export default Background3D
