import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import noPhoto from './noPhoto.png'
import { useParams } from "react-router-dom"
import { connect } from "react-redux";
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'


function RecommendationShare() {
  const [shareRecommendation,setShareRecommendation] = useState({})

  let { placeNum } =useParams();
  console.log(placeNum)
  useEffect(() => {
    const fetchDetailRecommendation = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST+`place/view?userNo=0&placeNo=${placeNum}`
        )
        console.log(response.data.place)
        await setShareRecommendation(response.data.place)
        
      } catch (e) {

      }
    }
    fetchDetailRecommendation()
  }, []) 

  return (
    // for map 사용
    <>
    <div style={{maxHeight:'650px'}} className={styles.Container}>
        {/* 사진용 왼쪽 컴포넌트 */}
        <div style={{backgroundColor:"gray", width:"300px", height:"auto"}} item xs={12} md={6}>
            {shareRecommendation.placeFile ? 
              <img src={shareRecommendation.placeFile} alt="" />
              : <img src={noPhoto} alt="" />
            }
        </div>
        {/* 글용 오른쪽 컴포넌트 */}
        <div style={{height:'auto%'}} className={styles.info} item xs={12} md={6}>
          <p className={styles.detail_title}>{shareRecommendation.placeName}</p>
          <p className={styles.detail_address}>{shareRecommendation.placeAddress}</p>
          <p>{shareRecommendation.placeInfo}</p>
          <Link to="/">
          <button>뒤로가기</button>         
        </Link>
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
)(RecommendationShare);
