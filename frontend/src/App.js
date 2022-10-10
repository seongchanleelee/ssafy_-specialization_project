// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom"
import Login from "./routes/Login"
import Main from "./routes/Main"
import KakaoRedirectHandler from "./routes/KakaoRedirectHandler";
import GuestLogin from "./routes/GuestLogin";
import RecommendationShare from "./components/RecommendationShare"
import FeedShare from "./components/FeedShare"
import NotFound from "./components/NotFound"
import RecommendationNameShare from "./components/RecommendationNameShare"
import MobileMenu from "./routes/MobileMenu"
import { connect } from "react-redux";
import { save } from ".";
// import cursor from "./images/cursor.png;

function App({counter, save}) {
  return (
  <Router >
    <Routes/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/loginHandler" element={<KakaoRedirectHandler />} />
      <Route path="/guestLogin" element={<GuestLogin />} />
      <Route path="/main/detail/RecommendationShare/:placeNum/0" element={<RecommendationShare />} />
      <Route path="/main/detail/FeedShare/:feedNum/0" element={<FeedShare />}/>
      <Route path="/main/detail/RecommendationNameShare/:placeName/0" element={<RecommendationNameShare />} />
      <Route path="/mobile" element={<MobileMenu />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </Router>
  );
}

// export default App;

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});
const mapDispatchToProps = dispatch => ({
  save: () => dispatch(save())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
