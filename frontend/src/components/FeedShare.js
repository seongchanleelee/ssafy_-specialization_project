import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import noPhoto from './noPhoto.png'
import { useParams } from "react-router-dom"
import { connect } from "react-redux";
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'

function FeedShare() {
  const [shareFeed,setShareFeed] = useState({})

  let { feedNum } =useParams();
  console.log(feedNum)
  useEffect(() => {
    const fetchDetailFeed = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST+`feed/view?userNo=0&feedNo=${feedNum}`
        )
        // console.log(response.data.feed)
        await setShareFeed(response.data.feed)
        
      } catch (e) {

      }
    }
    fetchDetailFeed()
  }, [])


  return (
    <div style={{height:"90vh"}}>
    <Card className={styles.CardShare} style={{width:"496px", height:"635px"}}>
      <Card.Header as="h5" style={{textAlign:"center"}}>
        {shareFeed.feedFile ? 
        <img className={styles.cardImg} src={shareFeed.feedFile} alt='img' /> : <img classname={styles.cardImg} src={noPhoto} />
        }
      </Card.Header>
      <Card.Body>
        <FontAwesomeIcon icon={faHeart} />
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faPaperPlane} />
        <Card.Text>
          <small>{shareFeed.feedLike}명이 좋아요를 눌렀습니다.</small>
          <p className={styles.show_writer}>작성자</p>
          <div style={{fontSize:"15px", fontWeight:"bold"}}>{shareFeed.feedNickname}</div>
          <div style={{fontSize:'12px'}}>{shareFeed.feedContent}</div>
          <Link to="/">
          <button>뒤로가기</button>         
        </Link>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(FeedShare);
