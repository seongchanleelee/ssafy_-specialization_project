import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './KakaoRedirectHandler.module.css'
import woori from '../images/wayg2.png'
import duri from '../images/pdoori.png'
// import bus from '../images/bus.png'
import { connect } from "react-redux";
import { save } from "../index";
import { useSearchParams } from 'react-router-dom';


const KakaoRedirectHandler = ({counter, save}) => {
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let access_token = params.get("access_token"); // 토큰 받는 부분
    let user_no = params.get("id"); // userNo 받는 부분
    console.log(access_token)
    console.log(user_no)

    save(access_token, user_no, [], [])

    const param_token = searchParams.get('access_token')
    console.log(param_token)
    if (param_token) {
      searchParams.delete('access_token');
      setSearchParams(searchParams);
    }

    const param_userNo = searchParams.get('id')
    console.log(param_userNo)
    if (param_userNo) {
      searchParams.delete('id');
      setSearchParams(searchParams);
    }

    setTimeout(() => {
      window.location.href = '/main';
    }, 3000)

  }, [])

  // useEffect(()=> {
  //   let params = new URL(document.location.toString()).searchParams;
  //   let code = params.get("code"); // 인가코드 받는 부분
  //   let grant_type = "authorization_code";
  //   let client_id = "bbe27fdfd6962e9fa7c41c8b3c99fb13";
  //   let REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  //   let client_secret = 'GVivIOJu8TfT4wvHekhGorCmk8xfxqaf';

  //   axios.post(`https://kauth.kakao.com/oauth/token?&grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}&client_secret=${client_secret}`, {
  //       headers: {
  //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //       } 
  //     }).then((res) => {
  //     console.log(res)
  //     console.log(res.data['access_token'])
  //     // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
  //     setTimeout(() => {
  //       window.location.href = 'http://localhost:8080/api/oauth2/authorization/kakao';
  //     }, 2000)
  // })
  //   // setTimeout(() => {navigate('/main')}, 6000)
  // }, [])


  

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.login_woori}>
          <img style={{width: "250px", height: "250px"}} src={duri} alt="woori"/>
        </div>
        {/* <div className={styles.login_bus}>
          <img style={{width: "250px", height: "250px"}} src={bus} alt="bus"/>
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});
const mapDispatchToProps = dispatch => ({
  save: (token, userNo, results, results2) => dispatch(save(token, userNo, results, results2))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KakaoRedirectHandler);