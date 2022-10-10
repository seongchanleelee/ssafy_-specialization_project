import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './GuestLogin.module.css'
import woori from '../images/wayg2.png'
import duri from '../images/pdoori.png'
// import bus from '../images/bus.png'
import { connect } from "react-redux";
import { save } from "../index";


const GuestLogin = ({counter, save}) => {
  const navigate = useNavigate();

  useEffect(() => {
    save('', 268, [], [])
    setTimeout(() => {
      window.location.href = '/main';
    }, 3000)

  }, [])

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
)(GuestLogin);