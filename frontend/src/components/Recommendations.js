import React, { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer"
import Recommendation from "./Recommendation";
import styles from "./Recommendations.module.css"
import axios from "axios"
import { connect } from "react-redux";

function Recommendations({counter}) {
  const [recommendations, setRecommendations] = useState([])
  // 무한 스크롤
  const obsRef = useRef(null);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true);
  
  const [recommendationLoading, setRecommendationLoading] = useState(null)
  const parentFunction = (x) => {
    setRecommendationLoading(true)
    setRecommendationLoading(false)
  }

  useEffect(()=>{
    // fetchFeeds();
    const observer = new IntersectionObserver(obsHandler, {threshold : 0.5});
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {observer.disconnect();}
  },[])

  useEffect(()=>{
    fetchFeeds();
  }, [page])

  const obsHandler = ((entries) => {
    const target = entries[0];
    if(target.isIntersecting ){
      setPage(prev => prev + 1);
    }
  })

  // place 불러오기
  const fetchFeeds = useCallback( async () => {
    setRecommendationLoading(true)
    setRecommendationLoading(false)
    setLoad(true);

    const res = await axios.get(
      process.env.REACT_APP_HOST+`place`
      ,{
      params: {
        page: page,
        size: 10,
        userNo: counter.userNo,
      }
    });
    if (res.data){
      // console.log(res.data)
      setRecommendations(prev => [...prev, ...res.data.placeList.content]);
    } else {
      console.log(res)
    }
    setLoad(false);
    }, [page]);

  return (
    <div className={styles.recommendations}>
      <h2>두리의 여행지 추천</h2>
        <div className={styles.recommendations_list}>
        {recommendations.map((recommendation,idx) => (
          <Recommendation parentFunction={parentFunction} {...recommendation} key={idx}/>
          ))}
          </div>
      <div ref={obsRef}>...</div>
    </div>
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Recommendations);
