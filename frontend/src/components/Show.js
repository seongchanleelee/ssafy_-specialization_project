import {useEffect, useState} from 'react'
import styles from './Show.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

function Show({feedFiles, feedTitle, feedContent, feedLike, feedLikeCnt, feedNickname, feedNo, userNo}) {
  const [detailContent,setDetailContent] = useState('')
  const [handle, setHandle] = useState(false);
  const handleClose = () => setHandle(false);
  const handleShow = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_HOST+`feed/view?userNo=${userNo}&feedNo=${feedNo}`
      )
      console.log(response.data.feed.feedContent)
      await setDetailContent(response.data.feed.feedContent)
      await setHandle(true)
    } catch(e) {
      console.log(e)
    }
    console.log(detailContent)
  };
  
  const deleteShow = async () => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_HOST+`feed/${feedNo}`
        
      )
      console.log(response)
    }
    catch (e) {
   
  }
}
  return (
    <>
    <div className={styles.show}>
      <div>{feedFiles}
        <img onClick={handleShow} className={styles.show_img} src={feedFiles} alt='img' />
        <div>
          <div className={styles.show_box}>
            <div>
                <FontAwesomeIcon icon={faHeart} />
                <span> </span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <p className={styles.show_writer}>작성자</p>
          <div className={styles.show_box}>
            <p>{feedNickname}</p>
            <p>{feedLike}</p>
            <p className={styles.show_title}>{feedTitle}</p>
            {/* <p className={styles.show_content}>{feedContent}</p> */}
            <p>{feedLikeCnt}</p>
            <p>{feedNo}</p>
          </div>
        </div>
      </div>
    </div>
    {/* 모달 */}
    <Modal show={handle} onHide={handleClose}>
    <div className={styles.show}>
      <div>{feedFiles}
        <img className={styles.show_img} src={feedFiles} alt='img' />
        <div>
          <div className={styles.show_box}>
            <div>
                <FontAwesomeIcon icon={faHeart} />
                <span> </span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <p className={styles.show_writer}>작성자</p>
          <div className={styles.show_box}>
            <p>{feedNickname}</p>
            <p className={styles.show_title}>{feedTitle}</p>
            <p className={styles.show_content}>{detailContent}</p>
            <p>{feedLikeCnt}</p>
            <p>{feedNo}</p>
            <button onClick={deleteShow}>삭제</button>
          </div>
        </div>
      </div>
    </div>
      </Modal>





    </>
  );
}

export default Show;

