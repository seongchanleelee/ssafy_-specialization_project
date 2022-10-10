import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import styles from './WordCloud.module.css'
import Wordcloud from "wordcloud"

const words = [
  ["told", 64],
  ["mistake", 11],
  ["thought", 16],
  ["bad", 17],
  ["correct", 10],
  ["day", 54],
  ["prescription", 12],
  ["time", 77],
  ["thing", 45],
  ["left", 19],
]

function WordCloud({placeName}) {
  const canvasRef = useRef(null);
  const [clouds, setClouds] = useState([])
  
  const makeCloud = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_HOST+`place/wordcloud?placeName=${placeName}`
      )
        console.log(response.data)
        setClouds(response.data.words)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    makeCloud();
    
    Wordcloud(canvasRef.current, {
      // list: words,
      list: clouds,
      shape: "circle",
      minRotation: 10,
      maxRotation: 90,
      shrinkToFit: true,
      // shrinkToFit: false,
      minSize: 2
    })
  }, [])

  useEffect(()=>{
    Wordcloud(canvasRef.current, {
      // list: words,
      list: clouds,
      shape: "circle",
      minRotation: 10,
      maxRotation: 90,
      shrinkToFit: true,
      // shrinkToFit: false,
      minSize: 2
    })
  },[clouds])

  return (
    <div id='my_canvas' className={styles.cloud} >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}


export default WordCloud;
