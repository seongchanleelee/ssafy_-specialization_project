import Feed from "./Feed";
import axios from "axios";
import styles from "./Feeds.module.css"
import React, {useEffect, useState, useRef} from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { connect } from "react-redux";

function Feeds({counter}) {

  const [feeds, setFeeds] = useState([])
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
          // console.log(response.data)
          setFeeds(response.data.feedList.content)
        } catch (e) {
          
        }
      };
    fetchFeeds();
  },[])

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className={styles.feeds}>
      <h2>우리의 피드 추천</h2>
      <Swiper
        // install Swiper modules
        className="feed_swiper"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView={1}
        navigation = {true}
        onSlideChange={() => console.log('slide change')}
        breakpoints={{
          800: {
            slidesPerView: 2,
            // spaceBetween: 20
          },
          // when window width is >= 480px
          1200: {
            slidesPerView: 3,
            // spaceBetween: 30
          },
          1600: {
            slidesPerView: 4,
            // spaceBetween: 40
          },
          // when window width is >= 640px
        }}
      >
        {feeds.map((feed,idx) => (
          <SwiperSlide key={idx}>
            <Feed {...feed} key={idx}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Feeds);