import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faBookmark as solidMark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import noPhoto from './noPhoto.png'
import { useParams } from "react-router-dom"
import { connect } from "react-redux";
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import WordCloud from "./WordCloud";

function RecommendationNameShare() {
  const [shareRecommendation,setShareRecommendation] = useState({})
  let { placeName, counter } = useParams()
  console.log(placeName)

  useEffect(() => {
    const fetchInfo = async () => {
    try {
      const response = await axios.post(
      process.env.REACT_APP_HOST+`place/search`, 
      { "userNo": 0,
        "placeName":placeName
      }
    )
    console.log(response.data.place)
    await setShareRecommendation(response.data.place)
    } catch (e) {
      console.log(e)
      }
}
    fetchInfo()
  },[])
  console.log(counter.userNo)


  return (
    <>
<div className={styles.Container}>
          {/* 사진용 컴포넌트 */}
            <div className={styles.photo} item xs={12} md={6}>
              <img style={{}} className={styles.detail_img} src={shareRecommendation.placeFile} onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src = './noPhoto.png'
              }} alt='img' />
              <div >
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            </div>
            {/* 워드 클라우드 컴포넌트 */ }
          <WordCloud placeName={shareRecommendation.placeName}></WordCloud>
          {/* 본문용 컴포넌트 */}
          <div style={{height:'auto%'}} className={styles.info} item xs={12} md={6}>
            
            <p className={styles.detail_title}>{shareRecommendation.placeName}</p>
            <p className={styles.detail_address}>{shareRecommendation.placeAddress}</p>
            <p className={styles.detail_content}>{shareRecommendation.placeInfo}</p>
            </div>
        </div>


 </>









  )
}
const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(RecommendationNameShare);
