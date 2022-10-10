// import FeedShare from './FeedShare';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './MobileFeed.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
// import { counter } from '@fortawesome/fontawesome-svg-core';

import { connect } from "react-redux";

function MobileFeed({counter, feedNo, feedTitle, feedContent, feedNickname, userNo, feedFile, feedLike,feedLikeYn}) {
  const [feed, setFeed] = useState({
    feedNo: {feedNo}.feedNo,
    feedTitle: {feedTitle}.feedTitle,
    feedContent: {feedContent}.feedContent,
    feedNickname: {feedNickname}.feedNickname, 
    userNo: {userNo}.userNo, 
    feedFile: {feedFile}.feedFile === null ? './noPhoto.png' : {feedFile}.feedFile , 
    feedLike: {feedLike}.feedLike, 
    feedLikeYn: {feedLikeYn}.feedLikeYn,
  })
  const [detailContent,setDetailContent] = useState('')
  const [handle, setHandle] = useState(false);
  const handleClose = () => setHandle(false);
  const [likeYn, setLikeYn] = useState(null)

  const plusLike = async () => {
    if (counter.userNo === 0) {
      alert("로그인 후 이용해주세요")
    } else {

    try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/like`
          ,{
          userNo: counter.userNo,
          feedNo: {feedNo}.feedNo
        });
        if (response.data.message === 'success'){
          let new_feed = feed
          new_feed.feedLikeYn = true;
          new_feed.feedLike+=1
          await setFeed(new_feed)
          await setLikeYn(true)
        }
      } catch (e) {
      }}
  };
  

  const deleteLike = async () => {
    try {
        const response = await axios.delete(
          process.env.REACT_APP_HOST+`feed/like/1`
          
          ,
          {
          params: {
            userNo: counter.userNo,
            feedNo: {feedNo}.feedNo,
          }
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          let new_feed = feed
          new_feed.feedLikeYn = false;
          new_feed.feedLike-=1
          
          await setFeed(new_feed)
          await setLikeYn(false)


          
        }
      } catch (e) {
        
      }
    };

  const shareKakaoLink = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: feed.feedTitle,
        description: feed.feedContent,
        imageUrl:
          'feedFile',
        link: {
          // mobileWebUrl: 'https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0',
          // webUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
          mobileWebUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
          webUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
        },
      },
      itemContent: {
        // profileText: 'Kakao',
        // profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      },
      social: {
        likeCount: feed.feedLike,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
            webUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
            // mobileWebUrl: `http://localhost:3000/main/detail/FeedShare/${feed.feedNo}/0`,
            // webUrl: `http://localhost:3000/main/detail/FeedShare/${feed.feedNo}/0`,
          },
        },
      ],
    });
  }

  const share = async () => {
    try {
      console.log('share')
      shareKakaoLink()
      } catch (e) {
        
      }
  };
  
  const onClickFeed = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_HOST+`feed/view?userNo=${userNo}&feedNo=${feedNo}`
      )
      console.log(response.data.feed.feedContent)
      await setDetailContent(response.data.feed.feedContent)
      await setHandle(true)
    }catch (e) {
      console.log(e)
    }
  } 

  return (
    // for map 사용
    <>
    <div className={styles.feed}>
      <div className={styles.feed_div}>
        <img onClick={onClickFeed} style={{cursor:"pointer"}} className={styles.feed_img} src={feed.feedFile} onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src='https://cdn.discordapp.com/attachments/1011092792438689903/1026857973819134043/noPhoto.png';
        }} alt='img' />
        <div className={styles.feed_description}>
          <div className={styles.feed_box}> 
            {/* <div onClick={onClickFeed} style={{cursor:"pointer"}} className={styles.feed_writer}>{feed.feedNickname}</div> */}
            <div onClick={onClickFeed} style={{cursor:"pointer"}} className={styles.feed_title}>{feed.feedTitle}</div>
          </div>
          <div className={styles.feed_box}>
            {feed.feedLikeYn ? 
              <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
              : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />}
            &nbsp;&nbsp;
            <FontAwesomeIcon onClick={share} icon={faPaperPlane} />
          </div>
          <div className={styles.feed_like}>
            {feed.feedLike}명이 이 피드를 좋아합니다!
          </div>
        </div>
        </div>
    </div>
    {/* 모달 */}
    <Modal className={styles.modal} size="md" show={handle} onHide={handleClose}>
    <Card style={{weight:"496px", height:"635px"}}>
      <Card.Header style={{height:"500px", width:"496px", paddingBottom: "0px",
    paddingRight: "0px",
    paddingLeft: "0px",
    paddingTop: "0px"}} as="h5">
        <img className={styles.cardImg} src={feed.feedFile} alt='img' />
      </Card.Header>
      <Card.Body>
        {feed.feedLikeYn ? 
          <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
        : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />}
        &nbsp;&nbsp;
        <FontAwesomeIcon onClick={share} icon={faPaperPlane} />
        <Card.Text>
          <small>{feed.feedLike}명이 좋아요를 눌렀습니다.</small>
          <p className={styles.show_writer}>작성자</p>
          <div style={{fontSize:"15px", fontWeight:"bold"}}>{feedNickname}</div>
          <div style={{fontSize:'12px'}}>{feedContent}</div>
        </Card.Text>
      </Card.Body>
    </Card>
      </Modal>

    </>
  )
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(MobileFeed);
