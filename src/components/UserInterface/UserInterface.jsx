import React, {useRef, useEffect} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import cx from 'classnames'
import styles from "./UserInterface.module.sass"

gsap.registerPlugin(ScrollTrigger)


const UserInterface = () => {
  useEffect(()=> {

    let sections = [...document.querySelectorAll('.section')]
    console.log('sec: ', sections)
    sections.forEach(section => {

      gsap.fromTo(section.children[0], 
        {
          // scale: 2,
        opacity: 0,
        // x: "-100%",
        // opacity: 1,
        },
        {
        opacity: 1,
        // x: 0,
        // duration: 5,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          // markers: true,
          // pin: true,
          scrub: 1,
          // toggleActions: 'restart pause reverse pause',
          // snap: 1 / (sections.length - 1),
          
        },
        

      })
    })

    
  })
  useEffect(()=> {
    let o = {a:0}
    gsap.to(o, {
        
      // duration: 5,
      scrollTrigger: {
        trigger: document.getElementById('wrapper'),
        markers: true,
        start: 'top top',
        end: 'bottom bottom',
        // pin: true,
        scrub: 1,
        snap: 1 / 2,
        onUpdate: (self) => {
          // console.log(self.progress)
        }
      },
  
    })


  })

  return (
    <div id='wrapper'>
      <div className={styles['user-interface']}>
        <div className={cx(styles['section'], 'section')}>

          <h1>My Heart Feels Like A Bottle Of Lotion</h1>
        </div>
        <hr />
        <div className={cx(styles['section'], 'section')}>

          <h1>Calm Down, It's Over</h1>
        </div>
        <hr />
        <div className={cx(styles['section'], 'section')}>

          <h1>Contact</h1>
        </div>
      </div>
    </div>
  )
}



export default UserInterface


