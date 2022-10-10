import Doori from '../images/LoadingPink.png'
import React from 'react'
import styles from "./LoadingPink.module.css"

function LoadingPink () {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.animation_Doori}>
          <img style={{width:"200px", height:"200px"}} src={Doori} alt="Doori" />
        </div>
      </div>
    </div>
  )
}

export default LoadingPink
