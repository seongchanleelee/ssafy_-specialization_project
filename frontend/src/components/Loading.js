import styles from "./Loading.module.css"
import React from 'react'
import woori from '../images/wayg2.png'
import woori2 from '../images/wayg.png'
import sunguri from '../images/sunguri.png'


function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.login_woori}>
          <img style={{width: "125px", height: "125px"}} src={woori} alt="woori"/>
        </div>
        <div className={styles.login_woori2}>
          <img style={{width: "125px", height: "125px"}} src={woori2} alt="woori"/>
        </div>
        <div className={styles.login_sunguri}>
          <img style={{width: "40px", height: "40px"}} src={sunguri} alt="sunguri"/>
        </div>
        
      </div>
    </div>
  );
}

export default Loading;