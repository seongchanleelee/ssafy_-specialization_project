import {useState, useEffect} from 'react'
import woori from '../images/wayg2.png'
import bus from '../images/bus.png'
import kakaoBtn from "../images/kakao_login_large_narrow.png"
import styles from "./Login.module.css";

// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({toDos, addToDo}) {
  const navigate = useNavigate();
  
  const REST_API_KEY = "bbe27fdfd6962e9fa7c41c8b3c99fb13"
  const REDIRECT_URI = process.env.REACT_APP_HOST+ "login"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const KAKAO_AUTH_URL = `http://localhost:8080/api/oauth2/authorization/kakao`;
  const kakao_btn = () => {
    alert("이메일 제공 동의를 누르셔야 서비스 가입이 가능해요!")
  }

  return (
    <div className={styles.login}>
      <div className={styles.login_items}>
        <h1 className={styles.pjt_name}>우리! 어디가?</h1>
        <div className={styles.container}>
          <div className={styles.box}>
          <div className={styles.login_woori}>
              <img style={{width: "200px", height: "200px"}} src={woori} alt="woori"/>
            </div>
            <div className={styles.login_bus}>
              <img style={{width: "300px", height: "300px"}} src={bus} alt="bus"/>
            </div>
            
          </div>
        </div>
        <div className={styles.button}>
          <a style={{}} onClick={kakao_btn} href={KAKAO_AUTH_URL}>
            <img
              src={kakaoBtn}
              className={styles.kakao_btn}
              alt="카카오 로그인 버튼"
            />
          </a>
          {/* <a href={KAKAO_AUTH_URL}>
            <div 
                className={styles.kakao_btn} 
                >
            </div>
          </a> */}
          <p onClick={() => navigate('/guestLogin')} className={styles.sub_button}>로그인 없이 사용하기</p>
        </div>
      </div>
    </div>
  );
}


export default Login;
