import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import Show from "./Show";
import styles from "./Shows.module.css"
import axios from "axios"

function Shows(likeFeed, myFeed) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchMyFeeds = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST+`feed/myFeed?page=0&size=10&userNo=1`
          
        );
        console.log(response.data.myFeedList.content)
        setItems(response.data.myFeedList.content)
      } catch (e) {

      }
    }
    fetchMyFeeds()
  },[myFeed])


  return (
    <div>
    {/* {likeFeed2 ? (<div className="">
    <h2>좋아요 누른 피드</h2>
    <div className={styles.shows_list}>
      {items.map((item,idx) => (
        <Show {...item} key={idx}/>
      ))}
    </div></div>) : null} */}

    <div className="">
    <h2>내가 작성한 피드</h2>
    <div className={styles.shows_list}>
      {items.map((item,idx) => (
        <Show {...item} key={idx}/>
      ))}
    </div></div>
    </div>
    
      
  );
}

export default Shows;