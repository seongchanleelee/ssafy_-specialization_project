import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import Recommendation from "../components/Recommendation";
import MobileResult from "../components/Mobile/MobileResult";
import MobileFeeds from "../components/Mobile/MobileFeeds";
import MobileRecommendations from "../components/Mobile/MobileRecommendations";
import MobileFeed from "../components/Mobile/MobileFeed";
import MobileRecommendation from "../components/Mobile/MobileRecommendation";
import styles from "./MobileMenu.module.css";
import axios from "axios";
import { connect } from "react-redux";
import woori2 from '../images/wayg.png';
import sunguri from '../images/sunguri.png';
import WordCloud from "../components/WordCloud";
import { useLocation } from 'react-router-dom';

function MobileMenu({load, search, scrapPlace ,likeFeed, myFeed, counter}) {
  const location = useLocation();
  const [items, setItems] = useState([])

  const popular = location.state.popular;
  const more = location.state.more;
  const like = location.state.like;
  const scrap = location.state.scrap;
  const my = location.state.my;

  const [relateFeed, setRelateFeed] = useState([])

  useEffect(()=> {
    const fetchFeeds = async () => {
      try {
          const response = await axios.get(process.env.REACT_APP_HOST+'feed'
          ,{
            params: {
              page: 0,
              size: 150,
              userNo: counter.userNo,
            }
          });
          console.log(response.data)
          setRelateFeed(response.data.feedList.content)
        } catch (e) {
          
        }
      };
    fetchFeeds();

  },[counter.results2])

  useEffect(() => {
    if (like) {
      const fetchLikeFeeds = async () => {
        try {
            const response = await axios.get(
              process.env.REACT_APP_HOST+`feed/myLikeList`,{
                params: {
                  page: 0,
                  size: 10,
                  userNo: counter.userNo,
                }
              }
              
              );
            console.log(response.data)
            setItems(response.data.myLikeList.content)
          } catch (e) {
            
          }
        };
      fetchLikeFeeds();
    }
    else if (my) {
      const fetchMyFeeds = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_HOST+`feed/myFeed`,{
              params: {
                page: 0,
                size: 10,
                userNo: counter.userNo,
              }
            }
           
            
            );
          console.log(response.data)
          setItems(response.data.myFeedList.content)
        } catch (e) {
  
        }
      }
      fetchMyFeeds()
    }
    else if (scrap) {
      const fetchMyPlaces = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_HOST+`place/myScrapList?`,{
              params: {
                page: 0,
                size: 10,
                userNo: counter.userNo,
              }
            }
            
          );
          console.log(response.data)
          setItems(response.data.myScrapList.content)
        } catch (e) {
  
        }
      }
      fetchMyPlaces()
    }
    else if (more) {
      console.log('more')
      // setItems(counter.results)
    }
  },[])

  const checkFeed = (str) => {
    return counter.results2.includes(str)
  }



  return (
    <div className="">
      {popular ? 
        <>
          <MobileFeeds/>
          <br />
          <MobileRecommendations/>
        </> 
        : null}
      {like ? 
        <>
          <h2>내가 좋아요 누른 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <MobileFeed {...item} key={idx}/>
            ))}
          </div>
        </> 
        : null}
      {my ? 
        <>
          <h2>내가 작성한 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <MobileFeed {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {scrap ? 
        <>
          <h2>내가 스크랩한 관광지</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <MobileRecommendation {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {more ? 
      <>
        <div className={styles.search_title}>
          <img style={{width: "60px", height: "60px"}} src={sunguri} alt="img"/>
          <h2>피드</h2>
        </div>
        <div className={styles.shows_list}>
          {relateFeed.map((result, idx) => (
            <div key={idx}>
              {checkFeed(result.feedPlacename) === true ? 
              <MobileFeed {...result}>{result}</MobileFeed> : null
              }
            </div>
          ))}
        </div>
      </> : null}
      {more ? 
      <>
        <div className={styles.search_title}>
          <img style={{width: "60px", height: "60px"}} src={sunguri} alt="img"/>
          <h2>관광지</h2>
        </div>
        <div className={styles.shows_list}>
          {counter.results.map((result,idx) => (
            <MobileResult placeName={result} key={idx} />
          ))}
        </div>
        
      </> : null}

    </div>
    
      
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(MobileMenu);