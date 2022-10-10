import styles from "./MobileChatBot.module.css";
import {useState, useEffect} from "react";
import woori from '../images/wayg.png'
import woori2 from '../images/wayg2.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faBars, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import CreateFeed from './CreateFeed'

import { connect } from "react-redux";
import { save } from "../index";

import { useNavigate } from 'react-router-dom';

function MobileChatBot({navigation, parentFunction, addFeed, load, changeLoad, counter, save, goSearch ,goLikeFeed, goPopular, goMyFeed, goScrapPlace}) {
  const navigate = useNavigate();
  
  // 데이터전송 axios를 위한 useState()
  const [receives, setReceives] = useState([]);
  const [receive, setReceive] = useState('');
  const [error, setError] = useState(null);
  const [greeting,setGreeting] = useState(false)
  const [sends, setSends] = useState([])
  const [returnMessage, setReturnMessage] = useState(false)
  const [loading, setLoading] = useState(false);

  const [handle, setHandle] = useState(false);
  const [chat, setChat] = useState([])
  const [menuBar, setMenuBar] = useState(false)
  const [story, setStory] = useState([])
  const [send, setSend] = useState("")
  // 결과값 저장
  const [results, setResults] = useState({})
  const [feedResults, setFeedResults] = useState({})
  // 채팅으로 보여줄 결과값
  // const [chatResults, setChatResults] = useState([])
  const [isPlace, setIsPlace] = useState(true)
  const [placeList, setPlaceList] = useState([])
  const [shareList, setShareList] = useState([])

  const createFeed = () => setHandle(true)
  const handleClose = () => setHandle(false);
  const onChange = (event) => setSend(event.target.value)

  // 더 많은 기능 사용하기에 필요한 카카오 로그인
  const REST_API_KEY = "bbe27fdfd6962e9fa7c41c8b3c99fb13"
  const REDIRECT_URI = process.env.REACT_APP_HOST+ "login"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  const helloChat = ['안녕 내 이름은 우리라고 해!', '안녕 나는 우리야!', "안녕? 난 우리야 여행지를 추천해줄게!"];
  const whereChat = ['어느곳으로 놀러가고 싶어?', '가고 싶은 지역이 있어?']
  const questionChat = ["오늘은 어떤 여행을 하고 싶어? 우리에게 알려줘!", "원하는 여행지를 알려줄래?", '가고 싶은 곳이 있어? 우리한테 얘기해 봐! 들어줄 수도 있어', '원하는 테마가 있어? 말해봐', '오늘은 어디로 갈 거야? 말해주면 추천해줄 수도 있고 안해줄수도 있지 ㅇㅅㅇ'  ]
  

  useEffect(() => {
    // console.log("penguin")
    // setGreeting((current) => !current)
    setChat([])
    setPlaceList([])
    setIsPlace(true)
    save(counter.token, counter.userNo, [], [])
    
    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * 3);
      setChat((currentArray) => [...currentArray, ['woori', helloChat[randomNum]]]);
    }, 500)
    
    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * 2);
      setChat((currentArray) => [...currentArray, ['woori', whereChat[randomNum]]]);
    }, 1500)
    
  },[])

  useEffect(()=> {
    let chatScreen = document.getElementById("chatScreen"); 
    chatScreen.scrollTop = chatScreen.scrollHeight; 

    let chatInput = document.getElementById('chatInput');
    chatInput.value = '';
  },[chat]) 

  // useEffect(() => {
  //   if (loading) {
  //     setChat((currentArray) => [...currentArray, ['woori', "좀만 기다려봐..."]]);
  //   }
  //   else {
  //     let new_array = chat;
  //     new_array = new_array.slice(0, -1);
  //     setChat(new_array);
  //   }
  // },[loading])


  const onSubmit = async (event) => {
    event.preventDefault();
    
    await setSends((currentArray) => [...currentArray,send]);
    await setChat((currentArray) => [...currentArray, ['user', send]]);
    
    if (isPlace) {
      // 검색시작
      setLoading(true);
      changeLoad();

      const res = await axios.post(process.env.REACT_APP_HOST + `chat/place`,{
        str: send
      });

      //검색 끝
      setLoading(false);
      changeLoad();
      
      if (res.data){
        if (res.data.message === 'success') {
          // console.log(res.data.placeList)
          if (isEmptyArr(res.data.placeList)){
            setChat((currentArray) => [...currentArray, ['woori', "응? 미안 무슨 말인지 모르겠어 ㅠㅅㅠ.. 어디로 가고 싶다고?"]]);
          }
          else if (res.data.placeList.length <= 3) {
            setChat((currentArray) => [...currentArray, ['woori', `미안 ! 내가 아는 곳은 여기밖에 없어 ! ${res.data.placeList[0]}`]]);
          }
          else{
            setPlaceList(res.data.placeList)
            setIsPlace(false)
            let randomNum = Math.floor(Math.random() * 5);
            setChat((currentArray) => [...currentArray, ['woori', questionChat[randomNum]]]);
          }
        }
      } else {
        console.log(res)
      }
    }
    else {
      // 검색시작
      // setLoading(true);
      setLoading(true);
      changeLoad();

      const res = await axios.post(process.env.REACT_APP_HOST + `chat`,{
        str: send,
        placeList: placeList
      });

      // 피드검색 시작
      const resFeed = await axios.post(process.env.REACT_APP_HOST + `feed`, {
        str:send,
        placeList:placeList
      })
      console.log(resFeed.data)

      //검색 끝
      setLoading(false);
      changeLoad();
      
      if (res.data){
        if (res.data.message === 'success') {
          // 검색결과가 없는 경우 -> "다시 질문"
          const isEmptyObj = (obj) => {
            if(obj.constructor === Object
               && Object.keys(obj).length === 0)  {
              return true;
            }
            return false;
          }
          console.log(res.data.content)
          if (isEmptyObj(res.data.content)){
            setChat((currentArray) => [...currentArray, ['woori', '다시 한 번 말해줘']]);
          }
          // 검색결과가 있는 경우
          else {
            let place_results = res.data.content
            let new_results = results
            console.log(place_results)
            //피드
            let feed_results = resFeed.data.content
            let new_feed_results = feedResults
            console.log(feed_results)
            // 결과값 점수 합쳐주기, 정렬
            const combineResult = async () => {
              for (let result in place_results) {
                if(place_results.hasOwnProperty(result) && placeList.includes(result)) {
                  if (new_results.hasOwnProperty(result)){
                    new_results[result] += place_results[result]
                  }
                  else {
                    new_results[result] = place_results[result]
                  }
                  await setResults(new_results)
                }
              }
              for (let feedResult in feed_results) {
                // console.log(feedResult)
                if(feed_results.hasOwnProperty(feedResult) && placeList.includes(feedResult)) {
                  if (new_feed_results.hasOwnProperty(feedResult)){
                    new_feed_results[feedResult] += feed_results[feedResult]
                  }
                  else {
                    new_feed_results[feedResult] = feed_results[feedResult]
                  }
                  await setFeedResults(new_feed_results)
                  console.log(new_feed_results)
                }
              }
            }
            await combineResult()
            await console.log('합한 결과', results)
            await console.log('feed합한 결과', feedResults)
            let sorted_results = Object.keys(results).sort(function(a, b){return results[b]-results[a]});
            let sorted_feed_results = Object.keys(feedResults).sort(function(a,b){return feedResults[b]-feedResults[a]});
            // await console.log(sorted_results)
            console.log(sorted_results)
            console.log(sorted_feed_results)
            // await setChatResults(sorted_results)
            // await console.log('정렬한 배열값', chatResults)
            if (!isEmptyArr(sorted_results)){
              await setChat((currentArray) => 
                [...currentArray, ['woori2', [{placename: sorted_results[0], img_src: makeImgSrc(sorted_results[0])}, 
                {placename: sorted_results[1], img_src: makeImgSrc(sorted_results[1])}, 
                {placename: sorted_results[2], img_src: makeImgSrc(sorted_results[2])} ]]]);
              // redux에 결과값 저장
              save(counter.token, counter.userNo, sorted_results, sorted_feed_results)
              // 카카오 공유할 3개 여행지 저장
              setShareList([{placename: sorted_results[0], img_src: makeImgSrc(sorted_results[0])}, 
              {placename: sorted_results[1], img_src: makeImgSrc(sorted_results[1])}, 
              {placename: sorted_results[2], img_src: makeImgSrc(sorted_results[2])}])
            }
            else {
              setChat((currentArray) => [...currentArray, ['woori', '미안.. 추천할 만한 곳이 없는걸...']]);
            }
            
          }
        }
      } else {
        console.log(res)
      }
    }
    
    await setSend("")
    // await setReturnMessage((event) => (!event))
  }

  const clickMenuBar = () => {
    setMenuBar(current => !current)
  }
    
  const makeImgSrc = (src) => {
    let new_src = src
    if (new_src[0] === '(') {
      new_src = new_src.replace('(', '')
    }
    new_src = new_src.replace(/ /g, '_');
    new_src = new_src.replace(')', '_');
    new_src = new_src.replace('(', '_');
    new_src = 'https://res.cloudinary.com/da8po50b1/image/upload/v1664854566/place/' + new_src +'_1.jpg'
    // console.log(new_src)
    return new_src
  }

  const startNew = async () => {
    await setChat([]);
    await setPlaceList([]);
    await setIsPlace(true);
    await save(counter.token, counter.userNo, [], []);
    await window.location.replace("/main")

    setTimeout(() => {
      setChat((currentArray) => [...currentArray, ['woori', "안녕? 난 우리야 여행지를 추천해줄게!"]]);
    }, 500)
    
    setTimeout(() => {
      setChat((currentArray) => [...currentArray, ['woori', "가고 싶은 지역이 있니?"]]);
    }, 500)
  }

  const isEmptyArr = (arr) => {
    if(Array.isArray(arr) && arr.length === 0)  {
      return true;
    }
    return false;
  }

  const closeMenuBar = () => {
    setMenuBar(false);
  }

  const shareKakaoLink = () => {
    window.Kakao.Share.sendDefault({

      objectType: 'list',
      headerTitle: '우리! 어디가?',
      headerLink: {
        mobileWebUrl: `https://j7c202.p.ssafy.io/`,
        webUrl: `https://j7c202.p.ssafy.io/`
      },
      contents: [
        {
          title: shareList[0].placename,
          imageUrl: shareList[0].img_src,
          link: {
            mobileWebUrl: `https://j7c202.p.ssafy.io/`,
            webUrl: `https://j7c202.p.ssafy.io/`
          },
        },
        {
          title: shareList[1].placename,
          imageUrl: shareList[1].img_src,
          link: {
            mobileWebUrl: `https://j7c202.p.ssafy.io/`,
            webUrl: `https://j7c202.p.ssafy.io/`
          },
        },
        {
          title: shareList[2].placename,
          imageUrl: shareList[2].img_src,
          link: {
            mobileWebUrl: `https://j7c202.p.ssafy.io/`,
            webUrl: `https://j7c202.p.ssafy.io/`
          },
        },
      ],
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: `https://j7c202.p.ssafy.io/`,
            webUrl: `https://j7c202.p.ssafy.io/`
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

  return (
      <div id="chatScreen" className={styles.chatbot}>
        <div className={styles.chatbot_title}>
          <div>'우리'랑 대화하기</div>
        </div>
        {/* {greeting ? (
        <div>
          <img className={styles.chatbot_woori} src={woori} alt="character" />
          <span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span>
        </div> ) : null} */}
      

      {menuBar ? 
      <ul className={styles.anotherFunction}>
        <li className={styles.menu} onClick={() => {startNew(); clickMenuBar();}} ><span>&#x1F601;</span> &nbsp;대화 새로 시작하기</li>
        <li className={styles.menu} onClick={() => navigate('/mobile', {state:{popular: true}}) }><span>&#x2728;</span> &nbsp;이번달 인기피드 보러가기</li>
        {Boolean(counter.userNo) ?
        <>
        <li className={styles.menu} onClick={() => navigate('/mobile', {state:{like: true}}) }><span>&#x1F49B;</span> &nbsp;내가 좋아요 누른 피드 보러가기</li>
        <li className={styles.menu} onClick={() => navigate('/mobile', {state:{scrap: true}}) }><span>&#x1F4CC;</span> &nbsp;내가 스크랩한 관광지 보러가기</li>
        <li className={styles.menu} onClick={() => navigate('/mobile', {state:{my: true}}) }><span>&#x1F4DA;</span> &nbsp;내가 올린 피드보기</li>
        <li className={styles.menu} onClick={() => {createFeed(); clickMenuBar();}}><span>&#x1F4DD;</span> &nbsp;피드작성하기</li>
        <li style={{color: "aliceblue"}}>빈값</li>
        </> : <div><a style={{textDecoration:"none", color:"black"}} href={KAKAO_AUTH_URL}><li className={styles.menu}><span>&#x1F511;</span> &nbsp;더 많은 기능 사용하기</li></a><li style={{color: "aliceblue"}}>빈값</li></div>
        
      }
      </ul>: null}

      <div className={styles.chatbot_main}>
        {chat.map((chat,idx) => (
          <div key={idx}>
            { chat[0] === "woori" ? 
            <div className={styles.message_woori}>
              <img className={styles.chatbot_wayg} src={woori} alt="character" />
              <div className={styles.receivedMessage}>
                {chat[1]}
              </div>
            </div> 
            : null }
            { chat[0] === "woori2" ? 
            <div className={styles.message_woori}>
              <img className={styles.chatbot_wayg} src={woori} alt="character" />
              <div className={styles.receivedMessage}>
                {/* {chat[1][0]} {chat[1][1]} {chat[1][2]} */}
                <div className={styles.chat_results}>
                {chat[1].map((place,idx) => (
                  <div key={idx} className={styles.chat_result}>
                    <img className={styles.chat_img} src={place.img_src} onError={({ currentTarget }) => {
                      currentTarget.onerror = null; 
                      currentTarget.src='./noPhoto.png';
                      }} alt="" />
                    <div className={styles.chat_text}>{place.placename}</div>
                  </div>
                ))}
                  <div onClick={() => navigate('/mobile', {state:{more: true}}) } className={styles.chat_more}>더보기</div>
                </div>
              </div>
              <div className={styles.chat_share}>
                <div className={styles.chat_shareBtn} onClick={share}>
                  <FontAwesomeIcon icon={faArrowUpFromBracket} />
                </div>
              </div>
            </div> 
            : null }
            { chat[0] === "user" ? 
            <div className={styles.message_user}>
              <span className={styles.sendMessage}>{chat[1]}</span>
              {/* <img className={styles.chatbot_wayg} src={woori2} alt="character" /> */}
            </div> 
            : null }
          </div>
        ))}

        {/* 로딩 중 */}
        { loading ? 
        <div className={styles.message_woori}>
          <img className={styles.chatbot_wayg} src={woori} alt="character" />
          <div className={styles.dot}>Loading...</div>
        </div>  
        : null }

      </div>

      <div className={styles.reply}> 
        <FontAwesomeIcon style={{padding: '2px', cursor: 'pointer'}} className='fa-2xl' onClick={clickMenuBar} icon={faBars} />
        <form onSubmit={onSubmit}>
            <input id="chatInput" className={styles.sendInput} onChange={onChange} value={send} type="text" placeholder="내용입력" />
            <button className={styles.chatBtn} onClick={() => {goSearch(); clickMenuBar(); closeMenuBar();}}>보내기</button>
        </form>
      </div>
      
      {/* 모달 */}
      <Modal show={handle} onHide={handleClose}>
        <CreateFeed></CreateFeed>
      </Modal>
    </div>
    
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});
const mapDispatchToProps = dispatch => ({
  save: (token, userNo, results, results2) => dispatch(save(token, userNo, results, results2))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileChatBot);