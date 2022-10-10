import Button from 'react-bootstrap/Button';
import styles from './Recommendation.module.css'
import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faBookmark as solidMark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import WordCloud from "./WordCloud";

import { connect } from "react-redux";

function Result({placeName, counter}) {
    const [placeImg, setPlaceImg] = useState("");
    const [searchResult, setSearchResult] = useState({placeFile: 'https://cdn.discordapp.com/attachments/1011092792438689903/1026857973819134043/noPhoto.png'})
    const [scrapYn, setScrapYn] = useState(null)
    const [detailContent, setDetailContent] = useState()
    const [handle, setHandle] = useState(false);
    const handleClose = () => setHandle(false);
    useEffect(()=>{
      const fetchInfo = async () => {
        try {
          const response = await axios.post(
            process.env.REACT_APP_HOST+`place/search`,
             {"userNo": counter.userNo,
              "placeName":placeName
            }
          )
          setSearchResult(response.data.place)
        } catch (e) {
          console.log(e)
        }
      }
      fetchInfo()

      //콘솔 없애기용
      // urlExistCheck(placeImg);
  },[])

    useEffect(()=>{
        const fetchInfo = async () => {
          try {
            const response = await axios.post(
              process.env.REACT_APP_HOST+`place/search`,
               {"userNo": counter.userNo,
                "placeName":placeName
              }
            )
            setSearchResult(response.data.place)
          } catch (e) {
            console.log(e)
          }
        }
        fetchInfo()

        //콘솔 없애기용
        // urlExistCheck(placeImg);
    },[placeName])

  const shareKakaoLink = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: searchResult.placeName,
        description: searchResult.placeInfo,
        imageUrl:
          'https://j7c202.p.ssafy.io/static/media/wayg2.ffea7454ef416b4ccb29.png',
        link: {
          mobileWebUrl: `https://j7c202.p.ssafy.io/main/detail/RecommendationNameShare/${placeName}/0`,
          webUrl: `https://j7c202.p.ssafy.io/main/detail/RecommendationNameShare/${placeName}/0`,
        },
      },
      itemContent: {
        // profileText: 'Kakao',
        // profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      },
      social: {
        likeCount: 0,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: `https://j7c202.p.ssafy.io/main/detail/RecommendationNameShare/${placeName}/0`,
            webUrl: `https://j7c202.p.ssafy.io/main/detail/RecommendationNameShare/${placeName}/0`,
            // mobileWebUrl: `http://localhost:3000/main/detail/RecommendationNameShare/${placeName}/0`,
            // webUrl: `http://localhost:3000/main/detail/RecommendationNameShare/${placeName}/0`,
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

  // 스크랩 추가
  const plusScrap = async () => {
    if (counter.userNo === 0) {
      alert('로그인 후 이용해주세요')
    } else {
    try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`place/scrap`
          ,{
          userNo: counter.userNo,
          placeNo: searchResult.placeNo
        });
        if (response.data.message === 'success'){
          let new_recommendation = searchResult
          new_recommendation.placeScrapYn = true;
          new_recommendation.placeScrap +=1
          await setSearchResult(new_recommendation)
          await setScrapYn(true)
          console.log('스크랩성공')
          
        }
      } catch (e) {
        
      }}
  };
  // 스크랩 제거
  const deleteScrap = async () => {
    try {
        const response = await axios.delete(
          process.env.REACT_APP_HOST+`place/scrap/1`

          ,{
          params: {
            userNo: counter.userNo,
            placeNo: searchResult.placeNo,
          }
        });
        if (response.data.message === 'success'){
          let new_recommendation = searchResult
          new_recommendation.placeScrapYn = false;
          new_recommendation.placeScrap -=1
          await setSearchResult(new_recommendation)
          await setScrapYn(false)
        }
      } catch (e) {
      }
    };
    
    const onClickRecommendation = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST+`place/view?userNo=${counter.userNo}&placeNo=${searchResult.placeNo}`
          
        )
        var placeInfo = await response.data.place.placeInfo
        var res = await searchResult.placeInfo.replace(/<br\s*[\/]?>/gi, " ")
        await setDetailContent(res)
        await setHandle(true)
      } catch (e) {
        console.log(e)
      }
    }
  return (
    <>
    <div className={styles.recommendation}>
      {/* <p>{searchResult}</p> */}
      <div>
        <div className={styles.headImg}>
        <img onClick={onClickRecommendation} className={styles.recommendation_img} src={searchResult.placeFile} onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src='https://cdn.discordapp.com/attachments/1011092792438689903/1026857973819134043/noPhoto.png';
        }}/>
        </div>
        <div className={styles.recommendation_description}>
          <div className={styles.recommendation_box}>
            {searchResult.placeScrapYn ? 
              <FontAwesomeIcon onClick={deleteScrap} className={styles.scrapY} icon={solidMark} /> 
              : <FontAwesomeIcon onClick={plusScrap} className={styles.scrapN} icon={faBookmark} />} 
            &nbsp;<small>{searchResult.placeScrap}</small>
            &nbsp;&nbsp;
            <FontAwesomeIcon onClick={share} className={styles.share_btn} icon={faPaperPlane} />
          </div>
          <p onClick={onClickRecommendation}  className={styles.recommendation_title}>{searchResult.placeName}</p>
          <p onClick={onClickRecommendation}  className={styles.recommendation_writer}>{searchResult.placeNo} {searchResult.placeAddress}</p>
          <p>{searchResult.placeScrapYn}</p>
          
        </div>
      </div>
    </div>
    
    {/* 모달 */}
    {/* <Modal className={styles.placeContent} show={handle} size="xl" onHide={handleClose}>
    <div className={styles.Container}>
        {/* 사진용 왼쪽 컴포넌트 */}
        {/* <div className={styles.photo} item xs={12} md={6}>
            <img style={{}} className={styles.detail_img} src={searchResult.placeFile} onError={({ currentTarget }) => {
              currentTarget.onerror = null; 
              currentTarget.src='https://cdn.discordapp.com/attachments/1011092792438689903/1026857973819134043/noPhoto.png'}} alt='img' />
        </div> */}
        {/* 글용 오른쪽 컴포넌트 */}
        {/* <div style={{height:'auto%'}} className={styles.info} item xs={12} md={6}>
          <div>
            {searchResult.placeScrapYn ? 
            <FontAwesomeIcon onClick={deleteScrap} className={styles.scrapY} icon={solidMark} /> 
            : <FontAwesomeIcon onClick={plusScrap} icon={faBookmark} />}
            &nbsp;<small>{searchResult.placeScrap}</small>
             &nbsp;&nbsp;
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
          <p className={styles.detail_title}>{searchResult.placeName}</p>
          <p className={styles.detail_address}>{searchResult.placeAddress}</p>
          <p>{detailContent}</p>
          </div> */}
      {/* {searchResult.placeScrapYn ? 
              <FontAwesomeIcon onClick={deleteScrap} className={styles.scrapY} icon={solidMark} /> 
              : <FontAwesomeIcon onClick={plusScrap} icon={faBookmark} />}
              &nbsp; <small>{searchResult.placeScrap}</small>
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faPaperPlane} /> */}
            {/* 워드 클라우드 컴포넌트 */ }
          {/* <WordCloud placeName={searchResult.placeName}></WordCloud> */}
          {/* 본문용 컴포넌트 */}
          {/* <div style={{height:'auto%'}} className={styles.info} item xs={12} md={6}>
            
            <p className={styles.detail_title}>{searchResult.placeName}</p>
            <p className={styles.detail_address}>{searchResult.placeAddress}</p>
            <p className={styles.detail_content}>{detailContent}</p>
            </div>

    </div>
    </Modal> */}
    <Modal className={styles.placeContent} show={handle} size="xl" onHide={handleClose}>
        <div className={styles.Container}>
          {/* 사진용 컴포넌트 */}
            <div className={styles.photo} item xs={12} md={6}>
              <img style={{}} className={styles.detail_img} src={searchResult.placeFile} onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src = 'https://cdn.discordapp.com/attachments/1011092792438689903/1026857973819134043/noPhoto.png'
              }} alt='img' />
              <div >
              {searchResult.placeScrapYn ? 
              <FontAwesomeIcon onClick={deleteScrap} className={styles.scrapY} icon={solidMark} /> 
              : <FontAwesomeIcon onClick={plusScrap} icon={faBookmark} />}
              &nbsp; <small>{searchResult.placeScrap}</small>
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            </div>
            {/* 워드 클라우드 컴포넌트 */ }
          <WordCloud placeName={searchResult.placeName}></WordCloud>
          {/* 본문용 컴포넌트 */}
          <div style={{height:'auto%'}} className={styles.info} item xs={12} md={6}>
            
            <p className={styles.detail_title}>{searchResult.placeName}</p>
            <p className={styles.detail_address}>{searchResult.placeAddress}</p>
            <p className={styles.detail_content}>{detailContent}</p>
            </div>
        </div>
        
        </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Result);

